import { AbsoluteArea, jahiaComponent, Render } from "@jahia/javascript-modules-library";
import { useTranslation } from "react-i18next";
import { Col, Row, Section } from "design-system";
import grid from "design-system/Grid/styles.module.css";
import classes from "./default.module.css";

jahiaComponent(
	{
		nodeType: "luxetemplate:footer",
		name: "default",
		componentType: "view",
	},
	(_, { renderContext }) => {
		const { t } = useTranslation();
		return (
			<Section component="footer">
				<Row>
					<Col className={grid.col_4}>
						<h5 className={classes.capitalize}>{t("footer.resources")}</h5>
						<ul className={classes.list}>
							<li>
								<a
									className={classes.fullTextCapitalize}
									href="https://academy.jahia.com/home"
									target="_blank"
									rel="noreferrer"
								>
									{t("footer.academy")}
								</a>
							</li>
							<li>
								<a
									className={classes.capitalize}
									href="https://academy.jahia.com/get-started"
									target="_blank"
									rel="noreferrer"
								>
									{t("footer.tutorial")}
								</a>
							</li>
							<li>
								<a
									className={classes.capitalize}
									href="https://github.com/Jahia/luxe-jahia-demo/"
									target="_blank"
									rel="noreferrer"
								>
									{t("footer.sourceCode")}
								</a>
							</li>
						</ul>
					</Col>
					<Col className={grid.col_5}>
						<Render content={loginForm} />
					</Col>
				</Row>
				<Row className={classes.disclaimer}>
					<Col>
						{/* numberOfItems={4} */}
						<AbsoluteArea
							name="footerNavLinkArea"
							parent={renderContext.getSite().getHome()}
							nodeType="jnt:linkList"
							allowedNodeTypes={["jnt:nodeLink", "jnt:externalLink"]}
						/>
					</Col>
					<Col className={classes.copyright}>
						<span>{t("footer.copyright", { currentDate: new Date().getFullYear() })}</span>
					</Col>
				</Row>
			</Section>
		);
	},
);

// The login form is implemented as static content.
// It will be added to the footer and cannot be modified by Jahia contributors.
const loginForm = {
	name: "loginForm",
	nodeType: "luxe:loginForm",
	properties: {
		"j:displayRememberMeButton": "true",
	},
};
