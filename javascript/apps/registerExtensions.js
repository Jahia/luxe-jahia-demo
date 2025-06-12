// import { gql } from "@apollo/client";
//
// const GET_CONTENT_PROPS = gql`
// 	query GetContentPropertiesQuery($name: String!, $language: String!) {
// 		jcr {
// 			nodeTypeByName(name: $name) {
// 				properties(fieldFilter: { filters: [{ fieldName: "hidden", value: "false" }] }) {
// 					name
// 					hidden
// 					displayName(language: $language)
// 					mandatory
// 					requiredType
// 				}
// 			}
// 		}
// 	}
// `;

window.jahia.uiExtender.registry.add("callback", "content-props-selector", {
	targets: ["jahiaApp-init:60"],
	callback: function () {
		const selector = window.jahia.uiExtender.registry.get(
			"selectorType",
			"MultipleLeftRightSelector",
		);
		window.jahia.uiExtender.registry.add("selectorType", "ContentPropsSelector", selector, {
			initValue: () => [{ value: { type: "String", value: "toto" }, displayValue: "Toto" }],
			// 	initValue: async (field, editorContext) => {
			// 		const dependentProperty = field.selectorOptions.find(
			// 			({ name }) => name === "dependentProperty",
			// 		);
			// 		if (!dependentProperty) return [];
			//
			// 		const { lang: language, client, nodeData } = editorContext;
			// 		const type = nodeData.properties.find(({ name }) => name === dependentProperty.value);
			//
			// 		if (!type) return [];
			//
			// 		const variables = {
			// 			type,
			// 			language,
			// 		};
			// 		return await client.query({ query: GET_CONTENT_PROPS, variables }).then((response) => {
			// 			const properties = response?.data?.jcr?.nodeTypeByName?.properties || [];
			// 			return properties.map(({ name, displayName, requiredType }) => {
			// 				return {
			// 					value: {
			// 						type: requiredType,
			// 						value: name,
			// 					},
			// 					displayValue: displayName,
			// 				};
			// 			});
			// 		});
			// 	},
		});
	},
});
