import { afterEach, describe, expect, it, vi } from "vitest";
import { geocodeAddress } from "./geocodeAddress";

// The module keeps a global in-memory cache: use a distinct address per test
// so cached entries of one test never leak into another.

const mockFetchResponse = (payload: unknown) =>
	vi.fn().mockResolvedValue({ json: () => Promise.resolve(payload) });

afterEach(() => {
	vi.unstubAllGlobals();
});

describe("geocodeAddress", () => {
	it("resolves the first Nominatim result into numeric coordinates", async () => {
		const fetchSpy = mockFetchResponse([
			{ lat: "48.8588897", lon: "2.3200410" },
			{ lat: "0", lon: "0" },
		]);
		vi.stubGlobal("fetch", fetchSpy);

		await expect(geocodeAddress("Paris, France")).resolves.toEqual({
			lat: 48.8588897,
			lng: 2.320041,
		});
		expect(fetchSpy).toHaveBeenCalledWith(
			"https://nominatim.openstreetmap.org/search?q=Paris%2C%20France&format=json",
		);
	});

	it("serves repeated lookups from the cache (single network call)", async () => {
		const fetchSpy = mockFetchResponse([{ lat: "46.2043907", lon: "6.1431577" }]);
		vi.stubGlobal("fetch", fetchSpy);

		const first = await geocodeAddress("Geneva, Switzerland");
		const second = await geocodeAddress("Geneva, Switzerland");

		expect(second).toEqual(first);
		expect(fetchSpy).toHaveBeenCalledTimes(1);
	});

	it("throws 'Address not found' on an empty result set", async () => {
		vi.stubGlobal("fetch", mockFetchResponse([]));

		await expect(geocodeAddress("Nowhere-Imaginary-Place-42")).rejects.toThrow("Address not found");
	});

	it("propagates network failures", async () => {
		vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("network down")));

		await expect(geocodeAddress("Lyon, France")).rejects.toThrow("network down");
	});
});
