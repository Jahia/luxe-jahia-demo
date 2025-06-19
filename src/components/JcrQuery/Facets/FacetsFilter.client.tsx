import { useState } from "react";
// import { DndProvider, useDrag, useDrop } from "react-dnd";
// import { HTML5Backend } from "react-dnd-html5-backend";
import MultiSelectDropdown, { type Option } from "~/commons/MultiSelectDropdown";
import StringFacet from "~/components/JcrQuery/Facets/Components/StringFacet";
// import LongFacet from "~/components/JcrQuery/Facets/Components/LongFacet";
import classes from "./FacetsFilter.client.module.css";
import type { FacetProps } from "~/components/JcrQuery/types";
import { useFacet } from "~/components/JcrQuery/Facets/Hooks/Facet.client";
import type { JCRQueryBuilderType } from "~/components/JcrQuery/JCRQueryBuilder";

// const ItemType = { FACET: "facet" };
//
// const FacetDraggable = ({
//   facet,
//   index,
//   moveFacet,
//   children,
// }: {
//   facet: FacetProps;
//   index: number;
//   moveFacet: (from: number, to: number) => void;
//   children: React.ReactNode;
// }) => {
//   const ref = useRef<HTMLDivElement>(null);
//
//   const [, drop] = useDrop({
//     accept: ItemType.FACET,
//     hover(item: { index: number }) {
//       if (!ref.current) return;
//       if (item.index === index) return;
//       moveFacet(item.index, index);
//       item.index = index;
//     },
//   });
//
//   const [{ isDragging }, drag] = useDrag({
//     type: ItemType.FACET,
//     item: { index },
//     collect: (monitor) => ({
//       isDragging: monitor.isDragging(),
//     }),
//   });
//
//   drag(drop(ref));
//
//   return (
//     <div
//       ref={ref}
//       className={`${classes.facetItem} ${isDragging ? classes.dragging : ""}`}
//       style={{ opacity: isDragging ? 0.5 : 1 }}
//     >
//       <div className={classes.facetContent}>{children}</div>
//     </div>
//   );
// };

const FacetsFilter = ({
  builder,
  facets,
  isEditMode,
  jcrQueryUuid,
}: {
  builder: JCRQueryBuilderType;
  facets: FacetProps[];
  isEditMode: boolean;
  jcrQueryUuid: string;
}) => {
  const { enabledFacets, handleFacetVisibilityChange, handleFacetValuesChange } = useFacet(
    builder,
    facets,
    jcrQueryUuid,
  );

  const Cmp = {
    STRING: StringFacet,
    // LONG: LongFacet,
  };

  const getFacetComponent = (facet: FacetProps) => {
    const FacetComponent = Cmp[facet.type];
    if (!FacetComponent) return null;
    return <FacetComponent {...{ facet, onChange: handleFacetValuesChange }} />;
  };

  // const enabledFacets = facetOrder.filter((facet) => facet.isActive);

  return (
    // <DndProvider backend={HTML5Backend}>
    <div>
      <h2>Facets</h2>
      <MultiSelectDropdown
        options={facets.map(({ id, label, isActive }) => ({
          value: id,
          label,
          isActive,
        }))}
        placeholder="select your facets"
        onChange={handleFacetVisibilityChange}
      />
      <div>
        {enabledFacets.map((facet, index) => (
          <div key={facet.id} className={classes.facetContent}>
            {getFacetComponent(facet)}
          </div>
          // <FacetDraggable key={facet.id} facet={facet} index={index} moveFacet={moveFacet}>
          //   {getFacetComponent(facet)}
          // </FacetDraggable>
        ))}
      </div>
    </div>
    // </DndProvider>
  );
};

export default FacetsFilter;
