import { buildNodeUrl, jahiaComponent } from "@jahia/javascript-modules-library";
import type { AgencyProps } from "./types";
import classes from "./default.module.css";
import placeholder from "/static/img/agency-placeholder.jpg";
import { LuxeImage } from "~/commons/LuxeImage";
import { useTranslation } from "react-i18next";

jahiaComponent(
	{
		nodeType: "luxe:agency",
		name: "default",
		componentType: "view",
	},
	({ name, address, phone, image: imageNode }: AgencyProps, { currentNode }) => {
		const { t } = useTranslation();

		return (
			<a className={classes.card} href={buildNodeUrl(currentNode)}>
				<LuxeImage
					node={imageNode}
					alt={t("alt.agency", { agency: name })}
					fallback={placeholder}
					className={classes.image}
					widths={[200, 400]} // 400 is for double density screens
					sizes="200px"
				/>
				<div className={classes.containerText}>
					<h2 className={classes.title}>{name}</h2>
					{address && <p>{address}</p>}
					{phone && <p>{phone}</p>}
				</div>
			</a>
		);
	},
);
