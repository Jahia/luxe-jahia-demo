import { buildNodeUrl, jahiaComponent } from "@jahia/javascript-modules-library";
import type { RealtorProps } from "./types.js";
import classes from "./default.module.css";
import placeholder from "/static/img/agent-placeholder.jpg";
import { LuxeImage } from "~/commons/image/LuxeImage";
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
				<LuxeImage
					node={imageNode}
					alt={t("alt.realtor", { realtor: fullName || currentNode.getDisplayableName() })}
					fallback={placeholder}
					className={classes.image}
					widths={[300, 600]} // 600 is for double density screens
					sizes="300px"
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
