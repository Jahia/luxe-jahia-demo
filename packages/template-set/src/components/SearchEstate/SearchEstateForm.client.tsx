import { Form, MultiSelectTags } from "design-system";
import { MapPinIcon, HomeIcon, RoomIcon } from "design-system/Icons";
import clsx from "clsx";
import classes from "./SearchEstateForm.client.module.css";
import { t } from "i18next";

type Props = {
	action?: string;
	params?: Record<string, string[]>;
	onChange?: (params: Record<string, string[]>) => void;
	className?: string;
	style?: React.CSSProperties;
};

const SearchEstateFormClient = ({ action, onChange, params = {}, className, style }: Props) => {
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

	return (
		<Form action={action} className={clsx(classes.form, classes.extended, className)} style={style}>
			<MultiSelectTags
				name="country"
				icon={<MapPinIcon />}
				options={Object.keys(estateCountryTranslation).map((k) => ({
					value: k,
					label: estateCountryTranslation[k],
				}))}
				initialSelected={params["country"] || []}
				onChange={(values) => {
					onChange?.({ ...params, country: values });
				}}
				placeholder={t("form.estate.placeholder.country")}
			/>

			<MultiSelectTags
				name="type"
				icon={<HomeIcon />}
				options={Object.keys(estateTypeTranslation).map((k) => ({
					value: k,
					label: estateTypeTranslation[k],
				}))}
				onChange={(values) => {
					onChange?.({ ...params, type: values });
				}}
				initialSelected={params["type"] || []}
				placeholder={t("form.estate.placeholder.type")}
			/>

			<MultiSelectTags
				name="bedrooms"
				icon={<RoomIcon />}
				options={Array.from({ length: 13 }, (_, i) => ({
					value: i.toString(),
					label: `${i === 0 ? t("estate.bedrooms.studio") : i}`,
				}))}
				onChange={(values) => {
					onChange?.({ ...params, bedrooms: values });
				}}
				initialSelected={params["bedrooms"] || []}
				placeholder={t("form.estate.placeholder.bedrooms")}
			/>

			{!onChange && (
				<button type="submit" className={classes.searchButton}>
					{t("form.estate.submit")}
				</button>
			)}
		</Form>
	);
};

export default SearchEstateFormClient;
