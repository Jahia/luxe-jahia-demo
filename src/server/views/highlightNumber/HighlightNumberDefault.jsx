import React from "react";
import PropTypes from "prop-types";
import {
  useServerContext,
  getNodeProps,
  defineJahiaComponent,
} from "@jahia/javascript-modules-library";
import clsx from "clsx";

export const HighlightNumberDefault = ({ className }) => {
  const { currentNode, currentResource } = useServerContext();
  const locale = currentResource.getLocale().getLanguage();
  const content = getNodeProps(currentNode, ["text", "number"]);

};

const cmp = jahiaComponent(
    {
        nodeType: "luxe:highlightNumber",
        displayName: "Default",
        componentType: "view",
    },
    ({text, number},{currentResource}) => {
        const locale = currentResource.getLocale().getLanguage();
        return (
            <div className={clsx("lux-highlightNumber")}>
                <h4 className="lux-highlightNumber_number text-center">
                    {number.toLocaleString(locale)}
                </h4>
                <p className="lux-highlightNumber_text text-center mb-0">{text}</p>
            </div>
        );
    }
)

// cmp({className})

HighlightNumberDefault.propTypes = {
  className: PropTypes.string,
};

HighlightNumberDefault.jahiaComponent = defineJahiaComponent();
