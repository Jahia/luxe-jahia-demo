import { useFormQuerySync } from "~/commons/hooks/useFormQuerySync";
import { Form, MultiSelectTags } from "design-system";
import { MapPinIcon, HomeIcon, RoomIcon } from "design-system/Icons";
import type { JCRQueryBuilder } from "~/commons/libs/jcrQueryBuilder";
import type { RenderNodeProps } from "~/commons/libs/jcrQueryBuilder/types.ts";
import { type FormEvent, useCallback, useMemo, useEffect } from "react";
import clsx from "clsx";
import classes from "./SearchEstateForm.client.module.css";
import { t } from "i18next";

type Props = {
	target?: string;
	builder?: JCRQueryBuilder;
	setNodes?: (nodes: RenderNodeProps[]) => void;
	mode?: "url" | "instant";
	className?: string;
	style?: React.CSSProperties;
};

const SearchEstateFormClient = ({
	target,
	builder,
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
		if (mode === "instant") {
			if (urlString) {
				window.history.pushState(null, "", urlString);
			}
		}
	}, [urlString, mode]);

	const handleChange = useCallback(
		async (name: string, rawValues: (string | number)[]) => {
			// Always update URL to preserve navigation history
			updateParam(name, rawValues);

			if (mode === "instant" && builder && setNodes) {
				builder.deleteConstraints(name);
				builder.setConstraints([{ prop: name, operator: "IN", values: rawValues }]);
				const nodes = await builder.execute();
				setNodes(nodes);
			}
		},
		[target, updateParam, builder, setNodes, mode],
	);

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (mode === "url" && target) {
			window.location.href = getUrlString();
		}
	};

	const initialValues = useMemo(() => {
		if (!builder) return {};

		const constraints = builder.getConstraints();
		return constraints.reduce<Record<string, (string | number)[]>>((acc, { prop, values }) => {
			if (Array.isArray(values)) {
				const filteredValues = values.filter((v) => typeof v === "string" || typeof v === "number");

				if (acc[prop]) {
					acc[prop] = [...acc[prop], ...filteredValues];
				} else {
					acc[prop] = filteredValues;
				}
			}
			return acc;
		}, {});
	}, [builder]);

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
					value: i,
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
