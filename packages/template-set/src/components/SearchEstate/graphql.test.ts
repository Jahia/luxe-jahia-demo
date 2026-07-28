/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, expect, it } from "vitest";
import { fetchEstate } from "./graphql";
import type { QueryConfig } from "./types";

// No offset/limit on purpose: fetchEstate falls back to 0 / 30 (the type
// requires them only because the server view always provides them)
const baseConfig = {
	workspace: "LIVE",
	rootPath: "/sites/mysite",
	language: "en",
	params: {},
	gqlUrl: "/modules/graphql",
} as QueryConfig;

/** Sync fake capturing the GraphQL variables and returning a canned payload. */
const fakeFetch = (data: any = { jcr: { nodesByCriteria: { nodes: [], pageInfo: { totalCount: 0 } } } }) => {
	const calls: { query: unknown; variables: any }[] = [];
	const f = (opts: any) => {
		calls.push(opts);
		return { data };
	};

	return { f, calls };
};

describe("fetchEstate criteria building", () => {
	it("queries the site subtree with no constraint when no param is set", () => {
		const { f, calls } = fakeFetch();
		fetchEstate(f, baseConfig);

		const { query } = calls[0].variables;
		expect(query.paths).toEqual(["/sites/mysite"]);
		expect(query.nodeType).toBe("luxe:estate");
		expect(query.ordering).toEqual({ property: "price", orderType: "DESC" });
		expect(query.nodeConstraint).toBeNull();
	});

	it("builds an any-constraint per parameter", () => {
		const { f, calls } = fakeFetch();
		fetchEstate(f, { ...baseConfig, params: { type: ["house"] } });

		expect(calls[0].variables.query.nodeConstraint).toEqual({
			all: [{ any: [{ property: "type", equals: "house" }] }],
		});
	});

	it("ANDs parameters and ORs the values of one parameter", () => {
		const { f, calls } = fakeFetch();
		fetchEstate(f, {
			...baseConfig,
			params: { type: ["house", "apartment"], bedrooms: ["2"] },
		});

		expect(calls[0].variables.query.nodeConstraint).toEqual({
			all: [
				{
					any: [
						{ property: "type", equals: "house" },
						{ property: "type", equals: "apartment" },
					],
				},
				{ any: [{ property: "bedrooms", equals: "2" }] },
			],
		});
	});

	it("drops parameters with no values (no repo-wide leak)", () => {
		const { f, calls } = fakeFetch();
		fetchEstate(f, { ...baseConfig, params: { type: [], bedrooms: [] } });

		const { query } = calls[0].variables;
		expect(query.nodeConstraint).toBeNull();
		expect(query.paths).toEqual(["/sites/mysite"]);
	});

	it("defaults pagination to offset 0 / limit 30 and passes overrides through", () => {
		const { f, calls } = fakeFetch();
		fetchEstate(f, baseConfig);
		expect(calls[0].variables).toMatchObject({ offset: 0, limit: 30 });

		fetchEstate(f, { ...baseConfig, offset: 60, limit: 20 });
		expect(calls[1].variables).toMatchObject({ offset: 60, limit: 20 });
	});

	it("passes the workspace and language through", () => {
		const { f, calls } = fakeFetch();
		fetchEstate(f, { ...baseConfig, workspace: "EDIT", language: "fr" });
		expect(calls[0].variables).toMatchObject({ workspace: "EDIT", language: "fr" });
	});
});

describe("fetchEstate response processing", () => {
	it("maps nodes and defaults the missing optional fields", () => {
		const { f } = fakeFetch({
			jcr: {
				nodesByCriteria: {
					nodes: [
						{
							url: "/estate-1.html",
							title: { value: "Estate One" },
							price: { longValue: 500 },
							surface: { longValue: 120 },
							bedrooms: { longValue: 3 },
							images: { refNodes: [{ url: "/img.jpg" }] },
						},
						{ url: "/estate-2.html", title: null, price: null, surface: null, bedrooms: null, images: null },
						null,
					],
					pageInfo: { totalCount: 42 },
				},
			},
		});

		const result = fetchEstate(f, baseConfig);
		expect(result.totalCount).toBe(42);
		expect(result.estates).toEqual([
			{
				url: "/estate-1.html",
				title: "Estate One",
				image: "/img.jpg",
				price: 500,
				surface: 120,
				bedrooms: 3,
			},
			{ url: "/estate-2.html", title: "", image: "", price: 0, surface: 0, bedrooms: 0 },
		]);
	});

	it("computes the current page from offset and limit", () => {
		const { f } = fakeFetch();
		expect(fetchEstate(f, baseConfig).currentPage).toBe(1);
		expect(fetchEstate(f, { ...baseConfig, offset: 60, limit: 30 }).currentPage).toBe(3);
	});

	it("returns an empty result when the response has no data", () => {
		const f = () => ({ data: undefined });
		const result = fetchEstate(f, baseConfig);
		expect(result).toEqual({ currentPage: 1, totalCount: 0, estates: [] });
	});
});
