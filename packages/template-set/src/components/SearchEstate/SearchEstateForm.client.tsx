import { useFormQuerySync } from "~/commons/hooks/useFormQuerySync";
import { Form, Field } from "design-system";
import { MapPinIcon, HomeIcon, RoomIcon } from "design-system/Icons";

type Props = {
	target: string | null;
};

const SearchEstateFormClient = ({ target }: Props) => {
	const { updateParam, getUrlString } = useFormQuerySync(target);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		updateParam(e.target.name, e.target.value);
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (target) {
			window.location.href = getUrlString();
		}
	};

	return (
		<Form onSubmit={handleSubmit}>
			<Field label="Localisation" icon={<MapPinIcon />}>
				<select name="location" defaultValue="" onChange={handleChange}>
					<option value="" disabled>
						Localisation
					</option>
					<option value="paris">Paris</option>
					<option value="lyon">Lyon</option>
				</select>
			</Field>

			<Field label="Type" icon={<HomeIcon />}>
				<select name="type" defaultValue="" onChange={handleChange}>
					<option value="" disabled>
						Type
					</option>
					<option value="studio">Studio</option>
					<option value="appartement">Appartement</option>
				</select>
			</Field>

			<Field label="Chambres" icon={<RoomIcon />}>
				<input type="number" name="rooms" min={1} onChange={handleChange} placeholder="Chambres" />
			</Field>

			<button type="submit" className="searchButton">
				Search
			</button>
		</Form>
	);
};

export default SearchEstateFormClient;
