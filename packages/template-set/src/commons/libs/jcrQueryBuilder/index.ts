import type {
	Constraint,
	JCRQueryConfig,
	RenderNodeProps,
} from "~/commons/libs/jcrQueryBuilder/types";

const gqlNodesQueryString = ({
	fragment,
	isRenderEnabled,
	limit,
	offset,
}: {
	fragment?: { name: string; value: string };
	isRenderEnabled: boolean;
	limit?: number;
	offset?: number;
}): string => {
	return `
    query GetContentPropertiesQuery($workspace: Workspace! ,$query: String!, ${isRenderEnabled ? "$view: String!," : ""} $language: String!) {
     jcr(workspace: $workspace) {
      nodesByQuery(
        query: $query
        ${limit && limit >= 0 ? `limit: ${limit}` : ""}
        ${offset && offset >= 0 ? `offset: ${offset}` : ""}
      ) {
        nodes {
          workspace
          uuid
          path
          name
          ${fragment?.value ? `...${fragment.name}` : ""}
          ${isRenderEnabled ? "renderedContent(view: $view, language: $language){ output }" : ""}
        }
      }
     }
    }
    ${fragment?.value ? fragment.value : ""}
  `;
};

export class JCRQueryBuilder {
	private readonly config: JCRQueryConfig;
	private readonly cacheDependency: string;
	private constraints = new Map<string, Set<Constraint>>();

	constructor(config: JCRQueryConfig) {
		this.config = { ...config };
		this.cacheDependency = `${config.startNodePath}/.*`;
		// Seed category constraints (they behave like any other constraint)
		if (config.categories?.length) {
			this.setConstraints(
				config.categories.map(
					({ id }) => ({ prop: "j:defaultCategory", operator: "=", value: id }) as Constraint,
				),
			);
		}
	}

	/** Merge constraints grouped by property */
	setConstraints(list: Constraint[]): this {
		for (const c of list) {
			const set = this.constraints.get(c.prop) ?? new Set<Constraint>();
			set.add(c);
			this.constraints.set(c.prop, set);
		}
		return this;
	}

	/** Remove all constraints for a given property */
	deleteConstraints(prop: string): this {
		this.constraints.delete(prop);
		return this;
	}

	/** Remove all constraints */
	clearConstraints(): this {
		this.constraints.clear();
		return this;
	}

	/** Build JCR-SQL2 query and cache dependency */
	build(): { jcrQuery: string; cacheDependency: string } {
		const as = "content";
		const { type, startNodePath } = this.config;

		const where: string[] = [`ISDESCENDANTNODE('${this.esc(startNodePath)}')`];

		const excl = this.buildExclude(as);
		if (excl) where.push(excl);

		const cons = this.buildConstraints(as);
		if (cons) where.push(cons);

		const order = `ORDER BY ${as}.[${this.config.criteria}] ${this.config.sortDirection}`;
		const jcrQuery =
			`SELECT * FROM [${type}] AS ${as} WHERE ${where.join(" AND ")} ${order}`.trim();

		return { jcrQuery, cacheDependency: this.cacheDependency };
	}

	/** Execute GraphQL query and map rendered HTML */
	async execute({ limit, offset }: { limit?: number; offset?: number } = {}): Promise<
		RenderNodeProps[]
	> {
		const { jcrQuery } = this.build();
		const query = gqlNodesQueryString({
			isRenderEnabled: true,
			limit: limit ?? this.config.limit ?? -1,
			offset: offset ?? this.config.offset ?? 0,
		});

		const res = await fetch("/modules/graphql", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				query,
				variables: {
					workspace: this.config.workspace,
					query: jcrQuery,
					view: this.config.subNodeView,
					language: this.config.language,
				},
			}),
		});

		if (!res.ok) throw new Error(`GraphQL HTTP error: ${res.status} ${res.statusText}`);

		const json = await res.json();
		if (json.errors?.length) throw new Error(`GraphQL errors: ${JSON.stringify(json.errors)}`);

		return (json.data?.jcr?.nodesByQuery?.nodes ?? []).map(
			({ uuid, renderedContent }: { uuid: string; renderedContent: { output: string } }) => ({
				uuid,
				html: renderedContent.output,
			}),
		);
	}

	// ---------- compact helpers ----------

	/** Build constraints: (prop = v1 OR prop = v2) AND ... */
	private buildConstraints(as: string): string {
		if (!this.constraints.size) return "";
		const groups: string[] = [];
		for (const [prop, set] of this.constraints) {
			if (!set.size) continue;
			// Heuristic: string values -> OR (multi-value), number -> AND
			const first = set.values().next().value as Constraint | undefined;
			const joiner = typeof first?.value === "number" ? " AND " : " OR ";
			const clauses = [...set].map(({ operator, value }) => {
				const rhs =
					typeof value === "string"
						? `'${this.esc(String(value))}'`
						: Number.isFinite(Number(value))
							? String(value)
							: "''";
				return `${as}.[${prop}] ${operator} ${rhs}`;
			});
			if (clauses.length) groups.push(`(${clauses.join(joiner)})`);
		}
		return groups.join(" AND ");
	}

	/** Build exclusion clause for UUIDs (and optional translationId) */
	private buildExclude(as: string): string {
		const ex = this.config.excludeNodes ?? [];
		if (!ex.length) return "";
		return `(${ex
			.map(({ id, translationId }) => {
				const parts = [`${as}.[jcr:uuid] <> '${this.esc(id)}'`];
				if (translationId) parts.push(`${as}.[jcr:uuid] <> '${this.esc(translationId)}'`);
				return `(${parts.join(" AND ")})`;
			})
			.join(" OR ")})`;
	}

	/** Escape single quotes for JCR-SQL2 literals */
	private esc(s: string): string {
		return s.replace(/'/g, "''");
	}
}
