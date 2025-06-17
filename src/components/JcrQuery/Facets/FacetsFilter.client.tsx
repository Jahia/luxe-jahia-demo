import { useState } from "react";
// import { DndProvider, useDrag, useDrop } from "react-dnd";
// import { HTML5Backend } from "react-dnd-html5-backend";
import MultiSelectDropdown, { type Option } from "~/commons/MultiSelectDropdown";
import StringFacet from "~/components/JcrQuery/Facets/Components/StringFacet";
// import LongFacet from "~/components/JcrQuery/Facets/Components/LongFacet";
import classes from "./FacetsFilter.client.module.css";
import type { FacetProps } from "~/components/JcrQuery/types";

export interface FacetItem {
  id: string;
  label: string;
  isActive: boolean;
  type: string;
  values: unknown[];
  selectedValues: unknown[];
}

// const ItemType = { FACET: "facet" };
//
// const FacetDraggable = ({
//   facet,
//   index,
//   moveFacet,
//   children,
// }: {
//   facet: FacetItem;
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

const FacetsFilter = ({ facets }: { facets: FacetProps[] }) => {
  const Cmp = {
    STRING: StringFacet,
    // LONG: LongFacet,
  };

  const [facetOrder, setFacetOrder] = useState<FacetItem[]>(
    facets.map((facet) => ({
      id: facet.name,
      label: facet.displayName,
      isActive: facet.isActive,
      type: facet.requiredType,
      values: facet.values || [],
      selectedValues: [],
    })),
  );

  const handleFacetChange = (_selectedFacets: Option[]) => {
    //todo: update filters and set facets isActive-> true and do the mutation to hidden fields facets
  };

  const moveFacet = (from: number, to: number) => {
    const updated = [...facetOrder];
    const [removed] = updated.splice(from, 1);
    updated.splice(to, 0, removed);
    setFacetOrder(updated);
  };

  const onChange = (facetId: string, values: unknown[]) => {
    setFacetOrder((prev) =>
      prev.map((facet) => (facet.id === facetId ? { ...facet, selectedValues: values } : facet)),
    );
  };

  // const onChange = (facetId: string, value: unknown) => {
  //   setFacetOrder((prev) =>
  //     prev.map((facet) =>
  //       facet.id === facetId
  //         ? {
  //             ...facet,
  //             selectedValues: facet.selectedValues.includes(value)
  //               ? facet.selectedValues.filter((v) => v !== value)
  //               : [...facet.selectedValues, value],
  //           }
  //         : facet,
  //     ),
  //   );
  // };

  const getFacetComponent = (facet: FacetItem) => {
    const FacetComponent = Cmp[facet.type];
    if (!FacetComponent) return null;
    return <FacetComponent {...{ facet, onChange }} />;
  };

  const enabledFacets = facetOrder.filter((facet) => facet.isActive);

  return (
    // <DndProvider backend={HTML5Backend}>
    <div>
      <h2>Facets</h2>
      <MultiSelectDropdown
        options={facets.map(({ name, displayName, isActive }) => ({
          value: name,
          label: displayName,
          isActive,
        }))}
        placeholder="Choisis tes fruits"
        onChange={handleFacetChange}
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
