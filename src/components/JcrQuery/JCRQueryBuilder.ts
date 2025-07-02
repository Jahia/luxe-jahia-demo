import type { Constraint, RenderNodeProps } from "~/components/JcrQuery/types";
import { gqlNodesQueryString } from "~/components/JcrQuery/utils";

export type JCRQueryConfig = {
  type: string;
  startNodePath: string;
  criteria: "jcr:created" | "jcr:lastModified" | "j:lastPublished";
  sortDirection: "asc" | "desc";
  categories: { id: string }[];
  excludeNodes: { id: string; translationId?: string }[];
  uuid: string;
  subNodeView: string;
  language: string;
  limit?: number;
  offset?: number;
};

export type JCRQueryResponse = {
  uuid: string;
  renderedContent: {
    output: string;
  };
};

export type JCRQueryBuilderType = {
  setConstraints: (constraints: Constraint[]) => JCRQueryBuilderType;
  deleteConstraints: (key: string) => JCRQueryBuilderType;
  build: () => {
    jcrQuery: string;
    cacheDependency: string;
  };
  execute: (options?: { limit?: number; offset?: number }) => Promise<RenderNodeProps[]>;
};

//todo review constraints -> Set<Constraint> and create a constraint group based on type
export class JCRQueryBuilder {
  private config: JCRQueryConfig;
  private constraints: Map<string, Set<Constraint>> = new Map();
  private cacheDependency: string;

  constructor(config: JCRQueryConfig) {
    this.config = { ...config };
    this.cacheDependency = `${config.startNodePath}/.*`;
    this.setConstraints(
      config.categories.map(
        ({ id }) => ({ prop: "j:defaultCategory", operator: "=", value: id }) as Constraint,
      ),
    );
  }

  setConstraints(constraints: Constraint[]): this {
    // group by props
    const byProp: Map<string, Set<Constraint>> = new Map();
    for (const constraint of constraints) {
      if (!byProp.has(constraint.prop)) {
        byProp.set(constraint.prop, new Set());
      }
      byProp.get(constraint.prop)!.add(constraint);
    }
    // replace the set
    for (const [prop, set] of byProp) {
      this.constraints.set(prop, set);
    }
    return this;
  }

  deleteConstraints(key: string): this {
    this.constraints.delete(key);
    return this;
  }

  build(): { jcrQuery: string; cacheDependency: string } {
    const asContent = "content";
    const { type, startNodePath, criteria, sortDirection, excludeNodes } = this.config;

    let constraintsClause = "";
    if (this.constraints.size > 0) {
      const andClauses = Array.from(this.constraints.entries())
        .map(([prop, constraintsSet]) => {
          if (constraintsSet.size === 0) return "";

          // On regarde le type de la première contrainte du set pour choisir le séparateur
          const first = constraintsSet.values().next().value;
          const isNumber = typeof first?.value === "number";

          const groupSeparator = isNumber ? " AND " : " OR ";

          const groupClause = Array.from(constraintsSet)
            .map(
              ({ operator, value }) =>
                `${asContent}.[${prop}] ${operator} ${typeof value === "string" ? `'${value}'` : value}`,
            )
            .join(groupSeparator);

          return `(${groupClause})`;
        })
        .filter(Boolean); // enlève les groupes vides

      if (andClauses.length > 0) {
        constraintsClause = "AND " + andClauses.join(" AND ");
      }
    }

    // Catégories it is a constraint like others
    // const categoryFilter = categories?.length
    //   ? "AND (" +
    //     categories.map((cat) => `${asContent}.[j:defaultCategory] = '${cat.id}'`).join(" OR ") +
    //     ")"
    //   : "";

    // Exclusions
    const excludeFilter = excludeNodes?.length
      ? "AND (" +
        excludeNodes
          .map(
            (node) =>
              `(${asContent}.[jcr:uuid] <> '${node.id}'${
                node.translationId ? ` AND ${asContent}.[jcr:uuid] <> '${node.translationId}'` : ""
              })`,
          )
          .join(" OR ") +
        ")"
      : "";

    const orderClause = `ORDER BY ${asContent}.[${criteria}] ${sortDirection}`;

    const jcrQuery =
      `SELECT * FROM [${type}] AS ${asContent} WHERE ISDESCENDANTNODE('${startNodePath}') ${excludeFilter} ${constraintsClause} ${orderClause}`.trim();

    return { jcrQuery, cacheDependency: this.cacheDependency };
  }

  async execute({
    limit,
    offset,
  }: {
    limit?: number;
    offset?: number;
  } = {}): Promise<RenderNodeProps[]> {
    const { jcrQuery } = this.build();
    const query = gqlNodesQueryString({
      isRenderEnabled: true,
      limit: limit || this.config.limit || -1,
      offset: offset || this.config.offset || 0,
    });

    // Exécute le call
    const res = await fetch("/modules/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify({
        query,
        variables: {
          query: jcrQuery,
          view: this.config.subNodeView,
          language: this.config.language,
        },
      }),
    });

    if (!res.ok) {
      throw new Error(`GraphQL error: ${res.status} ${res.statusText}`);
    }

    const result = await res.json();
    if (result.errors) {
      throw new Error(`GraphQL error: ${JSON.stringify(result.errors)}`);
    }
    return result.data?.jcr?.nodesByQuery?.nodes?.map(
      ({ uuid, renderedContent }: JCRQueryResponse) => ({
        uuid,
        html: renderedContent.output,
      }),
    );
  }
}
