import { useFormQuerySync } from "~/commons/hooks/useFormQuerySync";
import { Form, Field, MultiSelectTags } from "design-system";
import { MapPinIcon, HomeIcon, RoomIcon } from "design-system/Icons";
import type { JCRQueryBuilder } from "~/commons/libs/jcrQueryBuilder";
import type { RenderNodeProps } from "~/commons/libs/jcrQueryBuilder/types.ts";
import { useCallback, useMemo } from "react";
import clsx from "clsx";
import classes from "./SearchEstateForm.client.module.css";

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

	const handleChange = useCallback(
		async (name: string, rawValues: (string | number)[]) => {
			if (mode === "url" && target) {
				updateParam(name, rawValues);
				return;
			}

			if (mode === "instant" && builder && setNodes) {
				builder.deleteConstraints(name);
				builder.setConstraints([{ prop: name, operator: "IN", values: rawValues }]);
				const nodes = await builder.execute();
				setNodes(nodes);
			}
		},
		[target, updateParam, builder, setNodes],
	);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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
			<Field label="Country" icon={<MapPinIcon />}>
				<MultiSelectTags
					name="country"
					options={[
						{ value: "FR", label: "France" },
						{ value: "US", label: "United States" },
					]}
					initialSelected={initialValues["country"] || []}
					onChange={(vals) => handleChange("country", vals)}
					placeholder="Pays"
				/>
			</Field>

			<Field label="Type" icon={<HomeIcon />}>
				<MultiSelectTags
					name="type"
					options={[
						{ value: "house", label: "Maison" },
						{ value: "apartment", label: "Appartement" },
						{ value: "building", label: "Building" },
					]}
					initialSelected={initialValues["type"] || []}
					onChange={(vals) => handleChange("type", vals)}
					placeholder="Type de bien"
				/>
			</Field>

			<Field label="Chambres" icon={<RoomIcon />}>
				<MultiSelectTags
					name="bedrooms"
					options={Array.from({ length: 13 }, (_, i) => ({
						value: i,
						label: `${i === 0 ? "Studio" : i}`,
					}))}
					initialSelected={initialValues["bedrooms"] || []}
					onChange={(vals) => handleChange("bedrooms", vals)}
					placeholder="# Chambres"
				/>
			</Field>

			{mode === "url" && (
				<button type="submit" className={classes.searchButton}>
					Search
				</button>
			)}
		</Form>
	);
};

export default SearchEstateFormClient;
