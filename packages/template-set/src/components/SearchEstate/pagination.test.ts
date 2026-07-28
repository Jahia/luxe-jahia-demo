import { describe, expect, it } from "vitest";
import { parsePagination } from "./pagination";

describe("parsePagination", () => {
	it("parses nominal values", () => {
		expect(parsePagination("2", "9")).toEqual({ page: 2, limit: 9, offset: 9 });
	});

	it("applies the defaults", () => {
		expect(parsePagination("1", "30")).toEqual({ page: 1, limit: 30, offset: 0 });
	});

	it("falls back to the defaults on non-numeric values", () => {
		expect(parsePagination("abc", "abc")).toEqual({ page: 1, limit: 30, offset: 0 });
	});

	it("treats zero as the default (0 is falsy for parseInt-or-default)", () => {
		expect(parsePagination("0", "0")).toEqual({ page: 1, limit: 30, offset: 0 });
	});

	it("clamps negative values to the minimum", () => {
		expect(parsePagination("-3", "-5")).toEqual({ page: 1, limit: 1, offset: 0 });
	});

	it("clamps the limit to 100", () => {
		expect(parsePagination("1", "500")).toEqual({ page: 1, limit: 100, offset: 0 });
	});

	it("computes the offset from page and limit", () => {
		expect(parsePagination("4", "25")).toEqual({ page: 4, limit: 25, offset: 75 });
	});

	it("parses leading digits like parseInt does", () => {
		expect(parsePagination("2abc", "9px")).toEqual({ page: 2, limit: 9, offset: 9 });
	});
});
