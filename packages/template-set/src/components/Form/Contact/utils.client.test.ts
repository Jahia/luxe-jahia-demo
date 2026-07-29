import { afterEach, describe, expect, it, vi } from "vitest";
import { submitContact } from "./utils.client";
import type { MsgPropsProps } from "./types";

const body: MsgPropsProps = {
	firstName: "John",
	lastName: "Doe",
	email: "john.doe@example.com",
	message: "Hello",
};

const form = {} as HTMLFormElement;

/** Minimal window stub — the module only touches `window.wem`. */
const stubWindow = (wem?: unknown) => {
	vi.stubGlobal("window", wem === undefined ? {} : { wem });
};

const flushPromises = () => new Promise((resolve) => setTimeout(resolve, 0));

afterEach(() => {
	vi.unstubAllGlobals();
	vi.restoreAllMocks();
});

describe("submitContact — demo mode (no target)", () => {
	it("shows the feedback immediately and never calls fetch", () => {
		stubWindow();
		const fetchSpy = vi.fn();
		vi.stubGlobal("fetch", fetchSpy);
		const setFeedback = vi.fn();
		const setUnknownError = vi.fn();

		submitContact({ form, body, setFeedback, setUnknownError });

		expect(setFeedback).toHaveBeenCalledWith({ show: true, msgProps: body, ok: true, status: 200 });
		expect(fetchSpy).not.toHaveBeenCalled();
		expect(setUnknownError).not.toHaveBeenCalled();
	});
});

describe("submitContact — target endpoint", () => {
	it("POSTs the message as JSON to the target and shows the feedback on 200", async () => {
		stubWindow();
		const fetchSpy = vi.fn().mockResolvedValue({ ok: true, status: 200 });
		vi.stubGlobal("fetch", fetchSpy);
		const setFeedback = vi.fn();
		const setUnknownError = vi.fn();

		submitContact({ form, target: "/endpoint", body, setFeedback, setUnknownError });
		await flushPromises();

		expect(fetchSpy).toHaveBeenCalledWith("/endpoint", {
			method: "POST",
			headers: { "Content-Type": "application/json", "allow-redirects": "false" },
			body: JSON.stringify(body),
		});
		expect(setFeedback).toHaveBeenCalledWith({ show: true, msgProps: body, ok: true, status: 200 });
		expect(setUnknownError).not.toHaveBeenCalled();
	});

	it("flags the unknown error on a non-200 response", async () => {
		stubWindow();
		vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false, status: 500 }));
		const consoleError = vi.spyOn(console, "error").mockImplementation(() => undefined);
		const setFeedback = vi.fn();
		const setUnknownError = vi.fn();

		submitContact({ form, target: "/endpoint", body, setFeedback, setUnknownError });
		await flushPromises();

		expect(setUnknownError).toHaveBeenCalledWith(true);
		expect(setFeedback).not.toHaveBeenCalled();
		expect(consoleError).toHaveBeenCalled();
	});

	it("flags the unknown error on a network failure", async () => {
		stubWindow();
		vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("network down")));
		vi.spyOn(console, "error").mockImplementation(() => undefined);
		const setFeedback = vi.fn();
		const setUnknownError = vi.fn();

		submitContact({ form, target: "/endpoint", body, setFeedback, setUnknownError });
		await flushPromises();

		expect(setUnknownError).toHaveBeenCalledWith(true);
		expect(setFeedback).not.toHaveBeenCalled();
	});
});

describe("submitContact — jExperience bridge (window.wem)", () => {
	const buildWem = () => {
		const formEvent = {};
		return {
			formEvent,
			wem: {
				buildFormEvent: vi.fn().mockReturnValue(formEvent),
				_extractFormData: vi.fn().mockReturnValue({ field: "value" }),
				collectEvent: vi.fn(),
			},
		};
	};

	it("pushes a contactForm event with the extracted form data when wem exists", () => {
		const { wem, formEvent } = buildWem();
		stubWindow(wem);
		const setFeedback = vi.fn();
		const setUnknownError = vi.fn();

		submitContact({ form, body, setFeedback, setUnknownError });

		expect(wem.buildFormEvent).toHaveBeenCalledWith("contactForm");
		expect(wem._extractFormData).toHaveBeenCalledWith(form);
		expect(wem.collectEvent).toHaveBeenCalledTimes(1);
		expect(wem.collectEvent.mock.calls[0][0]).toBe(formEvent);
		expect((formEvent as { flattenedProperties?: unknown }).flattenedProperties).toEqual({
			fields: { field: "value" },
		});
	});

	it("shows the demo feedback through the wem success callback (no target)", () => {
		const { wem } = buildWem();
		stubWindow(wem);
		const setFeedback = vi.fn();

		submitContact({ form, body, setFeedback, setUnknownError: vi.fn() });
		setFeedback.mockClear();

		// Simulate the jExperience success callback
		const successCallback = wem.collectEvent.mock.calls[0][1] as (r: { status: number }) => void;
		successCallback({ status: 200 });

		expect(setFeedback).toHaveBeenCalledWith({ show: true, msgProps: body, ok: true, status: 200 });
	});

	it("does not crash when wem is absent", () => {
		stubWindow();
		expect(() => submitContact({ form, body, setFeedback: vi.fn(), setUnknownError: vi.fn() })).not.toThrow();
	});
});
