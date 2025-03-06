import clsx from "clsx";
import { Col, Row, Section } from "./grid";
import { useTranslation } from "react-i18next";
import { AbsoluteArea, Render } from "@jahia/javascript-modules-library";

const loginForm = {
  name: "loginForm",
  nodeType: "luxe:form",
  mixins: ["luxemix:loginForm"],
  properties: {
    "j:displayRememberMeButton": "true",
  },
};

export const HtmlFooter = ({ className }: { className?: string }) => {
  const { t } = useTranslation();

  return (
    <Section component="footer" className={clsx("lux-site-footer", className)}>
      <Row>
        <Col className="col-4">
          <h5>{t("footer.resources")}</h5>
          <ul className="list-unstyled">
            <li>
              <a
                className="text-capitalize"
                href="https://academy.jahia.com/home"
                target="_blank"
                rel="noreferrer"
              >
                {t("footer.academy")}
              </a>
            </li>
            <li>
              <a href="https://academy.jahia.com/get-started" target="_blank" rel="noreferrer">
                {t("footer.tutorial")}
              </a>
            </li>
            <li>
              <a href="https://github.com/Jahia/luxe-jahia-demo/" target="_blank" rel="noreferrer">
                {t("footer.sourceCode")}
              </a>
            </li>
          </ul>
        </Col>
        <Col className="col-5">
          <></>
          {/*<Render content={loginForm} />*/}
        </Col>
        <Col className="col-3">
          <></>
          {/* <h5>Join us</h5> */}
          {/* <ul className="list-inline"> */}
          {/*    <li className="list-inline-item"> */}
          {/*        <a href="#">twitter</a> */}
          {/*    </li> */}
          {/*    <li className="list-inline-item"> */}
          {/*        <a href="#">youtube</a> */}
          {/*    </li> */}
          {/*    <li className="list-inline-item"> */}
          {/*        <a href="#">Github</a> */}
          {/*    </li> */}
          {/* </ul> */}
        </Col>
      </Row>
      <Row className="lux-site-footer_disclaimer pb-3">
        <Col>
          {/* numberOfItems={4} */}
          <AbsoluteArea
            name="footerNavLinkArea"
            areaType="jnt:linkList"
            allowedTypes={["jnt:nodeLink", "jnt:externalLink"]}
          />
        </Col>
        <Col className="text-end">
          <span>{t("footer.copyright", { currentDate: new Date().getFullYear() })}</span>
        </Col>
      </Row>
    </Section>
  );
};
