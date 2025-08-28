import { Form, Field } from "design-system";
import { MapPinIcon, HomeIcon, RoomIcon } from "design-system/Icons";

export const SearchEstateFormClient = () => {
	return (
		<Form onSubmit={(e) => e.preventDefault()}>
			<Field label="Localisation" icon={<MapPinIcon />}>
				<select name="location" defaultValue="">
					<option value="" disabled>
						Localisation
					</option>
					<option value="paris">Paris</option>
					<option value="lyon">Lyon</option>
					<option value="marseille">Marseille</option>
				</select>
			</Field>

			<Field label="Type de bien" icon={<HomeIcon />}>
				<select name="type" defaultValue="">
					<option value="" disabled>
						Type
					</option>
					<option value="studio">Studio</option>
					<option value="appartement">Appartement</option>
					<option value="maison">Maison</option>
				</select>
			</Field>

			<Field label="Nombre de chambres" icon={<RoomIcon />}>
				<input type="number" name="rooms" placeholder="Chambres" min={1} />
			</Field>

			<button type="submit" className="searchButton">
				Search
			</button>
		</Form>
	);
};
