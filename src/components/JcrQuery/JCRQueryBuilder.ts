export type JCRQueryConfig = {
  type: string;
  startNodePath: string;
  criteria: "jcr:created" | "jcr:lastModified" | "j:lastPublished";
  sortDirection: "asc" | "desc";
  categories: { id: string }[];
  excludeNodes: { id: string; translationId?: string }[];
  warn: string[];
};

type Constraint = {
  prop: string;
  operator: string;
  value: string | number | boolean;
};

export type JCRQueryBuilderType = {
  addConstraint(
    prop: string,
    operator: string,
    value: string | number | boolean,
  ): JCRQueryBuilderType;
  build(): {
    jcrQuery: string;
    warn: string[];
    cacheDependency: string;
  };
};

//todo review constraints -> Set<Constraint> and create a constraint group based on type
export class JCRQueryBuilder {
  private config: JCRQueryConfig;
  private constraints: Constraint[] = [];
  private cacheDependency: string;
  private warnings: string[] = [];

  constructor(config: JCRQueryConfig) {
    this.config = { ...config };
    this.cacheDependency = `${config.startNodePath}/.*`;
    this.warnings = config.warn;
  }

  addConstraint(prop: string, operator: string, value: string | number | boolean): this {
    this.constraints.push({ prop, operator, value });
    return this;
  }

  build(): { jcrQuery: string; warn: string[]; cacheDependency: string } {
    const asContent = "content";
    const { type, startNodePath, criteria, sortDirection, categories, excludeNodes } = this.config;

    // Contraintes génériques
    const constraintsClause = this.constraints.length
      ? "AND (" +
        this.constraints
          .map(
            ({ prop, operator, value }) =>
              `${asContent}.[${prop}] ${operator} ${typeof value === "string" ? `'${value}'` : value}`,
          )
          .join(" OR ") +
        ")"
      : "";

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
}
