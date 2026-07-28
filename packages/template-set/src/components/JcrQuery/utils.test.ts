import { describe, expect, it, vi } from "vitest";
import type { JCRNodeWrapper } from "org.jahia.services.content";
import type { RenderContext } from "org.jahia.services.render";
import type { TFunction } from "i18next";

// Virtual module only available at runtime inside Jahia
vi.mock("@jahia/javascript-modules-library", () => ({
	server: { render: { addCacheDependency: vi.fn() } },
}));

import { server } from "@jahia/javascript-modules-library";
import { buildQuery } from "./utils";
import type { JcrQueryProps } from "./types";

/** Collapse whitespace so assertions ignore the template-literal indentation. */
const normalize = (query: string) => query.replace(/\s+/g, " ").trim();

const t = ((key: string, options?: { queryName?: string }) =>
	options?.queryName ? `${key}[${options.queryName}]` : key) as TFunction;

const fakeNode = (uuid: string, translations: Record<string, string> = {}) =>
	({
		getIdentifier: () => uuid,
		getNode: (name: string) => {
			const translationUuid = translations[name];
			return translationUuid ? { getIdentifier: () => translationUuid } : null;
		},
	}) as unknown as JCRNodeWrapper;

const currentNode = {
	getResolveSite: () => ({ getPath: () => "/sites/mysite" }),
} as unknown as JCRNodeWrapper;

const renderContext = {
	getMainResourceLocale: () => ({ getLanguage: () => "en" }),
} as unknown as RenderContext;

const baseQuery: JcrQueryProps = {
	"jcr:title": "My Query",
	type: "luxe:blogPost",
	criteria: "jcr:created",
	sortDirection: "asc",
} as JcrQueryProps;

const build = (overrides: Partial<JcrQueryProps> = {}) =>
	buildQuery({
		luxeQuery: { ...baseQuery, ...overrides },
		t,
		server,
		currentNode,
		renderContext,
	});

describe("buildQuery", () => {
	it("scopes the query to the site when no startNode is set", () => {
		const { jcrQuery, warn } = build();
		expect(normalize(jcrQuery)).toBe(
			"SELECT * FROM [luxe:blogPost] AS content WHERE ISDESCENDANTNODE('/sites/mysite') ORDER BY content.[jcr:created] asc",
		);
		expect(warn).toBeNull();
	});

	it("scopes the query to the startNode when set", () => {
		const startNode = {
			getPath: () => "/sites/mysite/contents/blog",
		} as unknown as JCRNodeWrapper;
		const { jcrQuery } = build({ startNode });
		expect(normalize(jcrQuery)).toContain(
			"WHERE ISDESCENDANTNODE('/sites/mysite/contents/blog')",
		);
	});

	it("injects the queried type and the ordering criteria", () => {
		const { jcrQuery } = build({
			type: "luxe:estate",
			criteria: "jcr:lastModified",
			sortDirection: "desc",
		});
		expect(normalize(jcrQuery)).toContain("FROM [luxe:estate] AS content");
		expect(normalize(jcrQuery)).toContain("ORDER BY content.[jcr:lastModified] desc");
	});

	it("filters on a single category", () => {
		const { jcrQuery, warn } = build({ filter: [fakeNode("cat-1")] });
		expect(normalize(jcrQuery)).toContain("AND ( content.[j:defaultCategory] = 'cat-1')");
		expect(warn).toBeNull();
	});

	it("ORs multiple categories", () => {
		const { jcrQuery } = build({ filter: [fakeNode("cat-1"), fakeNode("cat-2")] });
		expect(normalize(jcrQuery)).toContain(
			"( content.[j:defaultCategory] = 'cat-1' OR content.[j:defaultCategory] = 'cat-2')",
		);
	});

	it("warns and skips the filter when a category reference is dangling", () => {
		const { jcrQuery, warn } = build({
			filter: [undefined] as unknown as JcrQueryProps["filter"],
		});
		expect(warn).toBe("query.catIsMissing[My Query]");
		expect(normalize(jcrQuery)).not.toContain("j:defaultCategory");
	});

	it("excludes a node and its translation node", () => {
		const { jcrQuery } = build({
			excludeNodes: [fakeNode("uuid-x", { "j:translation_en": "uuid-x-en" })],
		});
		expect(normalize(jcrQuery)).toContain(
			"(content.[jcr:uuid] <> 'uuid-x' AND content.[jcr:uuid] <> 'uuid-x-en')",
		);
	});

	it("excludes a node without a translation node", () => {
		const { jcrQuery } = build({ excludeNodes: [fakeNode("uuid-x")] });
		expect(normalize(jcrQuery)).toContain("(content.[jcr:uuid] <> 'uuid-x' )");
		expect(normalize(jcrQuery)).not.toContain("AND content.[jcr:uuid] <> 'undefined'");
	});

	it("warns and skips the exclusion when an excluded reference is dangling", () => {
		const { jcrQuery, warn } = build({
			excludeNodes: [undefined] as unknown as JcrQueryProps["excludeNodes"],
		});
		expect(warn).toBe("query.excludeIsMissing[My Query]");
		expect(normalize(jcrQuery)).not.toContain("jcr:uuid");
	});

	it("registers a cache dependency on the queried subtree", () => {
		const addCacheDependency = vi.mocked(server.render.addCacheDependency);
		addCacheDependency.mockClear();
		build();
		expect(addCacheDependency).toHaveBeenCalledWith(
			{ flushOnPathMatchingRegexp: "/sites/mysite/.*" },
			renderContext,
		);
	});
});
