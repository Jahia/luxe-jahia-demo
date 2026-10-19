import { jahiaComponent, JImage, JLink } from "@jahia/javascript-modules-library";
import type { AgencyProps } from "./types";
import classes from "./default.module.css";
import placeholder from "/static/img/agency-placeholder.jpg";
import { imageClass } from "design-system";
import clsx from "clsx";
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
			<JLink node={currentNode} className={classes.card}>
				<JImage
					node={imageNode}
					alt={t("alt.agency", { agency: name })}
					fallback={placeholder}
					className={clsx(imageClass, classes.image)}
					layout="fixed"
					slotWidth={200}
				/>
				<div className={classes.containerText}>
					<h2 className={classes.title}>{name}</h2>
					{address && <p>{address}</p>}
					{phone && <p>{phone}</p>}
				</div>
			</JLink>
		);
	},
);
