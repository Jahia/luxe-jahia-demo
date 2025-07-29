/***
	This code runs when Jahia DxP is configured.
	If available, it will prefill the form with the user's context.
 ***/

// import type { MsgPropsProps } from "./types.js";
//
// export const getCookie = (name) => {
// 	const value = `; ${document.cookie}`;
// 	const parts = value.split(`; ${name}=`);
// 	if (parts.length === 2) {
// 		return parts.pop()?.split(";").shift();
// 	}
// };
//
// export const prefillWithUserContext = (sessionId, setFeedback) => {
// 	if (!sessionId) {
// 		return;
// 	}
//
// 	const contextServerPublicUrl = window.digitalData.contextServerPublicUrl;
// 	const body = {
// 		requiredProfileProperties: ["firstName", "lastName", "email"],
// 		sessionId,
// 		source: {
// 			itemId: window.digitalData.page?.pageInfo.pageID,
// 			itemType: "page",
// 			scope: window.digitalData.scope,
// 		},
// 	};
// 	fetch(`${contextServerPublicUrl}/context.json`, {
// 		method: "post",
// 		headers: {
// 			"Content-Type": "application/json",
// 			"allow-redirects": "false",
// 		},
// 		body: JSON.stringify(body),
// 	})
// 		.then((response) => {
// 			if (response.status !== 200) {
// 				throw new Error(`HTTP error! status: ${response.status}`);
// 			}
//
// 			return response.json();
// 		})
// 		.then((data) => {
// 			setFeedback((feedback) => ({
// 				...feedback,
// 				msgProps: data.profileProperties as MsgPropsProps,
// 			}));
// 		})
// 		.catch((error) => {
// 			console.log("Error in the call to retrieve user profiles data: ");
// 			console.error(error);
// 		});
// };
