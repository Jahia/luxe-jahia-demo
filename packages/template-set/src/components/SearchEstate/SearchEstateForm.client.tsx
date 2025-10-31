import { useFormQuerySync } from "~/commons/hooks/useFormQuerySync";
import { Form, MultiSelectTags } from "design-system";
import { MapPinIcon, HomeIcon, RoomIcon } from "design-system/Icons";
import type { JCRQueryConfig, RenderNodeProps } from "~/commons/libs/jcrQueryBuilder/types.ts";
import { type FormEvent, useCallback, useMemo, useEffect } from "react";
import clsx from "clsx";
import classes from "./SearchEstateForm.client.module.css";
import { t } from "i18next";
import { execute, gqlNodesQuery } from "~/commons/libs/jcrQueryBuilder/index.ts";

type Props = {
	target?: string;
	config: JCRQueryConfig;
	params: Record<string, string[]>;
	setNodes?: (nodes: RenderNodeProps[]) => void;
	mode?: "url" | "instant";
	className?: string;
	style?: React.CSSProperties;
};

const SearchEstateFormClient = ({
	target,
	params,
	config,
	setNodes,
	className,
	style,
	mode = target ? "url" : "instant",
}: Props) => {
	const { updateParam, getUrlString } = useFormQuerySync(target ?? null);

	const estateTypeTranslation = {
		house: t("estate.type.house"),
		apartment: t("estate.type.apartment"),
		building: t("estate.type.building"),
	};

	const estateCountryTranslation = {
		FR: t("country.FR"),
		US: t("country.US"),
		ID: t("country.ID"),
	};

	// Memoize the URL string to avoid excessive effect executions
	const urlString = useMemo(() => getUrlString(), [getUrlString]);

	// Update browser history when URL changes in instant mode
	useEffect(() => {
		if (mode === "instant" && urlString) {
			window.history.pushState(null, "", urlString);
		}
	}, [urlString, mode]);

	const handleChange = useCallback(
		async (name: string, rawValues: string[]) => {
			// Always update URL to preserve navigation history
			params[name] = rawValues;
			console.log(name, rawValues);
			updateParam(name, rawValues);

			if (mode === "instant" && setNodes) {
				// builder.deleteConstraints(name);
				// builder.setConstraints([{ prop: name, operator: "IN", values: rawValues }]);
				// const nodes = await builder.execute();
				// setNodes(nodes);

				const data = await execute(
					gqlNodesQuery,
					{
						workspace: config.workspace,
						query: {
							nodeType: config.type,
							nodeConstraint: {
								all: Object.entries(params)
									.map(([param, values]) => ({
										any: values.map((value) => ({ property: param, equals: value })),
									}))
									// Remove constraints with no values
									.filter(({ any }) => any.length > 0),
							},
							ordering: {
								property: config.criteria,
								orderType: config.sortDirection.toUpperCase() as "ASC" | "DESC",
							},
						},
						view: config.subNodeView,
						language: config.language,
						limit: config.limit,
					},
					{
						signal: AbortSignal.timeout(5000),
					},
				);

				const nodes = (data.jcr.nodesByCriteria?.nodes ?? [])
					.filter((node) => node !== null)
					.map(({ uuid, renderedContent }) => {
						if (!renderedContent?.output) {
							console.warn(`No rendered content for node ${uuid}`);
						}
						return {
							uuid,
							html: renderedContent?.output ?? "",
						};
					});

				setNodes(nodes);
			}
		},
		[target, updateParam, setNodes, mode],
	);

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (mode === "url" && target) {
			window.location.href = getUrlString();
		}
	};

	const initialValues = params;

	return (
		<Form
			onSubmit={handleSubmit}
			className={clsx(classes.form, classes.extended, className)}
			style={style}
		>
			<MultiSelectTags
				name="country"
				icon={<MapPinIcon />}
				options={Object.keys(estateCountryTranslation).map((k) => ({
					value: k,
					label: estateCountryTranslation[k],
				}))}
				initialSelected={initialValues["country"] || []}
				onChange={(vals) => handleChange("country", vals)}
				placeholder={t("form.estate.placeholder.country")}
			/>

			<MultiSelectTags
				name="type"
				icon={<HomeIcon />}
				options={Object.keys(estateTypeTranslation).map((k) => ({
					value: k,
					label: estateTypeTranslation[k],
				}))}
				initialSelected={initialValues["type"] || []}
				onChange={(vals) => handleChange("type", vals)}
				placeholder={t("form.estate.placeholder.type")}
			/>

			<MultiSelectTags
				name="bedrooms"
				icon={<RoomIcon />}
				options={Array.from({ length: 13 }, (_, i) => ({
					value: i.toString(),
					label: `${i === 0 ? t("estate.bedrooms.studio") : i}`,
				}))}
				initialSelected={initialValues["bedrooms"] || []}
				onChange={(vals) => handleChange("bedrooms", vals)}
				placeholder={t("form.estate.placeholder.bedrooms")}
			/>

			{mode === "url" && (
				<button type="submit" className={classes.searchButton}>
					{t("form.estate.submit")}
				</button>
			)}
		</Form>
	);
};

export default SearchEstateFormClient;
