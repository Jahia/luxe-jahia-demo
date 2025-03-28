import {
  AddContentButtons,
  getChildNodes,
  jahiaComponent,
  Render,
} from "@jahia/javascript-modules-library";
import type { JCRNodeWrapper } from "org.jahia.services.content";
import { Section } from "~/commons";

const getArrangement = (arrangement: string | null): string => {
  switch (arrangement) {
    case "left":
      return "align-items-start";
    case "center":
      return "align-items-center";
    case "right":
      return "align-items-end";
    default:
      return "";
  }
};

jahiaComponent(
  {
    nodeType: "luxe:section",
    name: "default",
    componentType: "view",
  },
  ({ arrangement }: { arrangement: "left" | "center" | "right" | null }, { currentNode }) => {
    const sectionContents = getChildNodes(currentNode, 100);
    return (
      <Section>
        {sectionContents.map((content) => (
          <Render
            key={content.getIdentifier()}
            node={content as JCRNodeWrapper}
            parameters={{ arrangement: getArrangement(arrangement) }}
          />
        ))}
        <AddContentButtons />
      </Section>
    );
  },
);
