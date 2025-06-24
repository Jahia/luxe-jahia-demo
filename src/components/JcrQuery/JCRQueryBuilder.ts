import type { Constraint, RenderNodeProps } from "~/components/JcrQuery/types";
import { gqlNodesQueryString } from "~/components/JcrQuery/utils";

export type JCRQueryConfig = {
  type: string;
  startNodePath: string;
  criteria: "jcr:created" | "jcr:lastModified" | "j:lastPublished";
  sortDirection: "asc" | "desc";
  categories: { id: string }[];
  excludeNodes: { id: string; translationId?: string }[];
  warn: string[];
  uuid: string;
  subNodeView: string;
  language: string;
};

export type JCRQueryResponse = {
  uuid: string;
  renderedContent: {
    output: string;
  };
};

export type JCRQueryBuilderType = {
  setConstraints: (...constraints: Constraint[]) => JCRQueryBuilderType;
  deleteConstraints: (key: string) => JCRQueryBuilderType;
  build: () => {
    jcrQuery: string;
    warn: string[];
    cacheDependency: string;
  };
  execute: (token?: string) => Promise<RenderNodeProps[]>;
};

//todo review constraints -> Set<Constraint> and create a constraint group based on type
export class JCRQueryBuilder {
  private config: JCRQueryConfig;
  private constraints: Map<string, Set<Constraint>> = new Map();
  private cacheDependency: string;
  private warnings: string[] = [];

  constructor(config: JCRQueryConfig) {
    this.config = { ...config };
    this.cacheDependency = `${config.startNodePath}/.*`;
    this.warnings = config.warn;
  }

  setConstraints(...constraints: Constraint[]): this {
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

  build(): { jcrQuery: string; warn: string[]; cacheDependency: string } {
    const asContent = "content";
    const { type, startNodePath, criteria, sortDirection, categories, excludeNodes } = this.config;

    let constraintsClause = "";
    if (this.constraints.size > 0) {
      const andClauses = Array.from(this.constraints.entries())
        .map(([prop, constraintsSet]) => {
          if (constraintsSet.size === 0) return "";

          // OR entre chaque contrainte d'un même groupe
          const orGroup = Array.from(constraintsSet)
            .map(
              ({ operator, value }) =>
                `${asContent}.[${prop}] ${operator} ${typeof value === "string" ? `'${value}'` : value}`,
            )
            .join(" OR ");

          // Ajoute les parenthèses pour chaque groupe de OR
          return `(${orGroup})`;
        })
        .filter(Boolean); // enlève les groupes vides, au cas où

      if (andClauses.length > 0) {
        constraintsClause = "AND " + andClauses.join(" AND ");
      }
    }

    // Catégories
    const categoryFilter = categories?.length
      ? "AND (" +
        categories.map((cat) => `${asContent}.[j:defaultCategory] = '${cat.id}'`).join(" OR ") +
        ")"
      : "";

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
      `SELECT * FROM [${type}] AS ${asContent} WHERE ISDESCENDANTNODE('${startNodePath}') ${categoryFilter} ${excludeFilter} ${constraintsClause} ${orderClause}`.trim();

    return { jcrQuery, warn: this.warnings, cacheDependency: this.cacheDependency };
  }

  async execute(token?: string): Promise<RenderNodeProps[]> {
    const { jcrQuery } = this.build();
    const query = gqlNodesQueryString({
      isRenderEnabled: true,
    });

    // Exécute le call
    const res = await fetch("/modules/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
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
