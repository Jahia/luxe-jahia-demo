import { jahiaComponent } from "@jahia/javascript-modules-library";
import clsx from "clsx";

jahiaComponent(
  {
    nodeType: "luxe:HighlightNumber",
    displayName: "Default",
    componentType: "view",
  },
  ({ text, number }: { text: string; number: bigint }, { currentResource }) => {
    const locale = currentResource.getLocale().getLanguage();
    return (
      <div className={clsx("lux-highlightNumber")}>
        <h4 className="lux-highlightNumber_number text-center">{number.toLocaleString(locale)}</h4>
        <p className="lux-highlightNumber_text text-center mb-0">{text}</p>
      </div>
    );
  },
);
