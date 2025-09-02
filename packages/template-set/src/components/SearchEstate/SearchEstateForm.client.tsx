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

	const handleChange = useCallback(
		async (name: string, rawValues: (string | number)[]) => {
			if (target) {
				// Update URL params
				updateParam(name, rawValues);
				return;
			}

			if (!builder || !setNodes) return;

			// Update builder constraints
			if (rawValues.length === 0) {
				builder.deleteConstraints(name);
			} else {
				builder.setConstraints([{ prop: name, operator: "IN", values: rawValues }]);
			}

			const nodes = await builder.execute();
			setNodes(nodes);
		},
		[target, updateParam, builder, setNodes],
	);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (target) {
			window.location.href = getUrlString();
		}
	};

	return (
		<Form onSubmit={handleSubmit}>
			<Field label="Localisation" icon={<MapPinIcon />}>
				<MultiSelectTags
					name="country"
					options={[
						{ value: "FR", label: "France" },
						{ value: "US", label: "United States" },
					]}
					// initialSelected={[...]}
					onChange={(vals) => handleChange("country", vals)}
				/>
				{/*<select name="country" defaultValue="" onChange={handleChange} multiple>*/}
				{/*	<option value="" disabled>*/}
				{/*		Localisation*/}
				{/*	</option>*/}
				{/*	<option value="FR">France</option>*/}
				{/*	<option value="US">United State</option>*/}
				{/*</select>*/}
			</Field>

			<Field label="Type" icon={<HomeIcon />}>
				<MultiSelectTags
					name="country"
					options={[
						{ value: "house", label: "Maison" },
						{ value: "apartment", label: "Appartement" },
						{ value: "building", label: "Building" },
					]}
					// initialSelected={[...]}
					onChange={(vals) => handleChange("country", vals)}
				/>
				{/*<select name="type" defaultValue="" onChange={handleChange} multiple>*/}
				{/*	<option value="" disabled>*/}
				{/*		Type*/}
				{/*	</option>*/}
				{/*	<option value="house">Maison</option>*/}
				{/*	<option value="apartment">Appartement</option>*/}
				{/*	<option value="building">Building</option>*/}
				{/*</select>*/}
			</Field>

			<Field label="Chambres" icon={<RoomIcon />}>
				<input
					type="number"
					name="rooms"
					min={1}
					onChange={(vals) => handleChange("rooms", [vals])}
					placeholder="Chambres"
				/>
			</Field>

			<button type="submit" className="searchButton">
				Search
			</button>
		</Form>
	);
};

export default SearchEstateFormClient;
