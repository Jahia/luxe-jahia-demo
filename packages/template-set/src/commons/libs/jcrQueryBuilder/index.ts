import type {
	Constraint,
	ConstraintJoiner,
	JCRQueryConfig,
	RenderNodeProps,
} from "~/commons/libs/jcrQueryBuilder/types";

export const gqlNodesQueryString = ({
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
    query GetContentPropertiesQuery(
    	$workspace: Workspace!,
    	$query: String!,
    	${isRenderEnabled ? "$view: String!," : ""}
    	$language: String!
		){
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
    ${fragment?.value ?? ""}
  `.trim();
};

export class JCRQueryBuilder {
	private readonly config: JCRQueryConfig;
	private readonly cacheDependency: string;
	private constraints = new Map<string, Set<Constraint>>();
	private constraintJoiners = new Map<string, ConstraintJoiner>();

	constructor(config: JCRQueryConfig) {
		this.config = { ...config };
		this.cacheDependency = `${config.startNodePath}/.*`;

		if (config.categories?.length) {
			this.setConstraints([
				{
					prop: "j:defaultCategory",
					operator: "IN",
					values: config.categories.map(({ id }) => id),
				},
			]);
		}
	}

	/** Define the logical joiner (AND/OR) to use for a specific property */
	setConstraintJoiner(prop: string, joiner: ConstraintJoiner): this {
		this.constraintJoiners.set(prop, joiner);
		return this;
	}

	/** Merge constraints grouped by property */
	setConstraints(list: Constraint[]): this {
		for (const c of list) {
			if (!this.isAllowedOperator(c.operator)) {
				throw new Error(`Unsupported or suspicious operator "${c.operator}" for prop "${c.prop}"`);
			}

			const op = c.operator.toUpperCase();
			const values = c.values;

			if (!Array.isArray(values) || values.length === 0) {
				continue;
			}

			// Auto-expand IN / NOT IN into multiple atomic constraints
			if (op === "IN" || op === "NOT IN") {
				const atomicOp = op === "IN" ? "=" : "<>";
				const joiner = op === "IN" ? "OR" : "AND";

				this.setConstraintJoiner(c.prop, joiner);

				for (const v of values) {
					const set = this.constraints.get(c.prop) ?? new Set<Constraint>();
					const candidate = { prop: c.prop, operator: atomicOp, values: [v] };
					if (!this.isConstraintDuplicate(set, candidate)) {
						set.add(candidate);
						this.constraints.set(c.prop, set);
					}
				}
			} else {
				// Default case: push constraint as-is, avoid duplicates
				const set = this.constraints.get(c.prop) ?? new Set<Constraint>();
				if (!this.isConstraintDuplicate(set, c)) {
					set.add(c);
					this.constraints.set(c.prop, set);
				}
			}
		}
		return this;
	}

	// /** Returns all constraints associated with a given property */
	// getConstraint(prop: string): Constraint[] {
	// 	return [...(this.constraints.get(prop) ?? [])];
	// }

	/** Return current constraints as a flat array (for rehydration or serialization) */
	getConstraints(): Constraint[] {
		const all: Constraint[] = [];
		for (const [, set] of this.constraints) {
			for (const c of set) {
				all.push(c);
			}
		}
		return all;
	}

	deleteConstraints(prop: string): this {
		this.constraints.delete(prop);
		this.constraintJoiners.delete(prop);
		return this;
	}

	clearConstraints(): this {
		this.constraints.clear();
		this.constraintJoiners.clear();
		return this;
	}

	build(): { jcrQuery: string; cacheDependency: string } {
		const as = "content";
		const { type, startNodePath } = this.config;

		const where: string[] = [`ISDESCENDANTNODE('${this.esc(startNodePath)}')`];

		const excl = this.buildExclude(as);
		if (excl) where.push(excl);

		const cons = this.buildConstraints(as);
		if (cons) where.push(cons);

		const order = `ORDER BY ${as}.[${this.config.criteria}] ${this.config.sortDirection.toUpperCase()}`;
		const jcrQuery = `SELECT * FROM [${type}] AS ${as} WHERE ${where.join(" AND ")} ${order}`;

		return { jcrQuery, cacheDependency: this.cacheDependency };
	}

	async execute({
		limit,
		offset,
		timeoutMs = 5000,
	}: { limit?: number; offset?: number; timeoutMs?: number } = {}): Promise<RenderNodeProps[]> {
		const { jcrQuery } = this.build();

		const query = gqlNodesQueryString({
			isRenderEnabled: true,
			limit: limit ?? this.config.limit ?? -1,
			offset: offset ?? this.config.offset ?? 0,
		});

		const controller = new AbortController();
		const id = setTimeout(() => controller.abort(), timeoutMs);

		try {
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
				signal: controller.signal,
			});

			if (!res.ok) throw new Error(`GraphQL HTTP error: ${res.status} ${res.statusText}`);

			const json = await res.json();
			if (json.errors?.length) throw new Error(`GraphQL errors: ${JSON.stringify(json.errors)}`);

			const nodes =
				json.data?.jcr?.nodesByQuery?.nodes ??
				([] as Array<{ uuid: string; renderedContent?: { output: string } }>);

			return nodes.map(({ uuid, renderedContent }) => ({
				uuid,
				html: renderedContent?.output ?? "",
			}));
		} finally {
			clearTimeout(id);
		}
	}

	/** Utility to detect if a constraint already exists in a Set */
	private isConstraintDuplicate(set: Set<Constraint>, candidate: Constraint): boolean {
		for (const existing of set) {
			if (
				existing.operator === candidate.operator &&
				JSON.stringify(existing.values) === JSON.stringify(candidate.values)
			) {
				return true;
			}
		}
		return false;
	}

	private isAllowedOperator(op: string): boolean {
		return ["=", "<>", ">", "<", ">=", "<=", "LIKE", "IN", "NOT IN"].includes(op.toUpperCase());
	}

	/** Build constraints as grouped OR/AND expressions per property */
	private buildConstraints(as: string): string {
		if (!this.constraints.size) return "";

		const groups: string[] = [];

		for (const [prop, set] of this.constraints) {
			if (!set.size) continue;

			const joiner = this.constraintJoiners.get(prop) ?? "OR";

			const clauses = [...set]
				.map(({ operator, values }) => {
					const op = operator.toUpperCase();
					if (!Array.isArray(values) || values.length === 0) return null;

					// Compact IN / NOT IN if multiple values
					if ((op === "IN" || op === "NOT IN") && values.length >= 1) {
						return `${as}.[${prop}] ${op} (${this.formatValue(values)})`;
					}

					// Single value case: =, <>, >=, etc.
					if (values.length === 1) {
						return `${as}.[${prop}] ${op} ${this.formatScalar(values[0])}`;
					}

					// Fallback: OR-chained multiple comparisons (e.g. (a = x OR a = y))
					return `(${values
						.map((v) => `${as}.[${prop}] ${op} ${this.formatScalar(v)}`)
						.join(" OR ")})`;
				})
				.filter(Boolean);

			if (clauses.length) {
				groups.push(`(${clauses.join(` ${joiner} `)})`);
			}
		}

		return groups.join(" AND ");
	}

	private formatValue(values: Array<string | number | boolean | Date>): string {
		return values.map((v) => this.formatScalar(v)).join(", ");
	}

	private formatScalar(value: string | number | boolean | Date): string {
		if (typeof value === "string") return `'${this.esc(value)}'`;
		if (typeof value === "number") return String(value);
		if (typeof value === "boolean") return value ? "true" : "false";
		if (value instanceof Date) return `'${this.esc(value.toISOString())}'`;
		return "''"; // fallback for unknown types
	}

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

	private esc(s: string): string {
		return s.replace(/'/g, "''");
	}
}
