import { buildNodeUrl, jahiaComponent, JImage } from "@jahia/javascript-modules-library";
import type { RealtorProps } from "./types.js";
import classes from "./default.module.css";
import placeholder from "/static/img/agent-placeholder.jpg";
import { imageClass } from "design-system";
import clsx from "clsx";
import { useTranslation } from "react-i18next";

jahiaComponent(
	{
		nodeType: "luxe:realtor",
		name: "default",
		componentType: "view",
	},
	({ firstName, lastName, jobPosition, image: imageNode }: RealtorProps, { currentNode }) => {
		const { t } = useTranslation();
		const fullName = [firstName, lastName].filter(Boolean).join(" ");

		const jobPositionLanguagesTranslation = {
			junior: t("realtor.jobPosition.junior"),
			senior: t("realtor.jobPosition.senior"),
			director: t("realtor.jobPosition.director"),
		};

		return (
			<a href={buildNodeUrl(currentNode)} className={classes.card}>
				<JImage
					node={imageNode}
					alt={t("alt.realtor", { realtor: fullName || currentNode.getDisplayableName() })}
					fallback={placeholder}
					className={clsx(imageClass, classes.image)}
					layout="fixed"
					slotWidth={300}
				/>
				<div className={classes.main}>
					<h3>{fullName || currentNode.getDisplayableName()}</h3>
					{jobPosition && (
						<p className={classes.jobPosition}>{jobPositionLanguagesTranslation[jobPosition]}</p>
					)}
				</div>
			</a>
		);
	},
);
