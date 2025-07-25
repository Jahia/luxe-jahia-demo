export const submitContact = ({ form, target, body, setFeedback, setUnknownError }) => {
	// The following code is used in the demo site to display a validation message
	// even though no user action has been performed.
	if (!target) {
		setFeedback({
			show: true,
			msgProps: body,
			ok: true,
			status: 200,
		});
	}

	// If user wants to use its own process to manage the data
	if (target) {
		fetch(target, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"allow-redirects": "false",
			},
			body: JSON.stringify(body),
		})
			.then(({ ok, status }) => {
				if (status !== 200) {
					throw new Error(`HTTP error! status: ${status}`);
				}

				setFeedback({
					show: true,
					msgProps: body,
					ok, //: true,
					status, //: 200,
				});
			})
			.catch((error) => {
				console.error("Contact form error : ", error);
				setUnknownError(true);
			});
	}

	// This code runs when Jahia DxP is configured.
	// Form info are sync with jExp if exist
	if (window.wem) {
		const contactFormEvent = window.wem.buildFormEvent("contactForm");
		// @ts-expect-error need to have types exported from jExp wem
		contactFormEvent.flattenedProperties = {
			// @ts-expect-error need to have types exported from jExp wem
			fields: window.wem._extractFormData(form),
		};
		// @ts-expect-error need to have types exported from jExp wem
		window.wem.collectEvent(
			contactFormEvent,
			function ({ status }) {
				if (status !== 200) {
					throw new Error(`HTTP error! status: ${status}`);
				}

				if (!target) {
					setFeedback({
						show: true,
						msgProps: body,
						// Note remove Hardcoded value
						ok: true,
						status, // : 200
					});
				}
			},
			function (xhr) {
				console.error("oups something get wrong with jExp: ", xhr);
			},
		);
	}
};
