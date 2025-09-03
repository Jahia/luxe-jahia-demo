import { useFormQuerySync } from "~/commons/hooks/useFormQuerySync";
import { Form, Field, MultiSelectTags } from "design-system";
import { MapPinIcon, HomeIcon, RoomIcon } from "design-system/Icons";
import type { JCRQueryBuilder } from "~/commons/libs/jcrQueryBuilder";
import type { RenderNodeProps } from "~/commons/libs/jcrQueryBuilder/types.ts";
import { useCallback } from "react";

type Props = {
	target?: string;
	builder?: JCRQueryBuilder;
	setNodes?: (nodes: RenderNodeProps[]) => void;
};

const SearchEstateFormClient = ({ target, builder, setNodes }: Props) => {
	const { updateParam, getUrlString } = useFormQuerySync(target ?? null);

	const handleChange = // useCallback(
		async (name: string, rawValues: (string | number)[]) => {
			if (target) {
				// Update URL params
				updateParam(name, rawValues);
				return;
			}

			if (!builder || !setNodes) return;
			console.log("type:", name, "values:", rawValues);
			// Update builder constraints, clean and replace
			// if (rawValues.length === 0) {
			builder.deleteConstraints(name);
			// } else {
			builder.setConstraints([{ prop: name, operator: "IN", values: rawValues }]);
			// }
			console.log("builder constraints 2", builder.getConstraints());
			const nodes = await builder.execute();
			setNodes(nodes);
		};
	// 	[target, updateParam, builder, setNodes],
	// );

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (target) {
			window.location.href = getUrlString();
		}
	};

	const getInitialValues = //useCallback(
		(propName: string): (string | number)[] => {
			if (!builder) return [];

			return builder.getConstraints().reduce<(string | number)[]>((acc, { prop, values }) => {
				if (prop !== propName || !Array.isArray(values)) return acc;

				const filtered = values.filter(
					(v): v is string | number => typeof v === "string" || typeof v === "number",
				);

				return [...acc, ...filtered];
			}, []);
		};
	// 	[builder],
	// );

	return (
		<Form onSubmit={handleSubmit}>
			<Field label="Country" icon={<MapPinIcon />}>
				<MultiSelectTags
					name="country"
					options={[
						{ value: "FR", label: "France" },
						{ value: "US", label: "United States" },
					]}
					initialSelected={getInitialValues("country")}
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
					initialSelected={getInitialValues("type")}
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
					initialSelected={getInitialValues("bedrooms")}
					onChange={(vals) => handleChange("bedrooms", vals)}
					placeholder="# Chambres"
				/>
			</Field>

			<button type="submit" className="searchButton">
				Search
			</button>
		</Form>
	);
};

export default SearchEstateFormClient;
