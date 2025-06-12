import { useState } from "react";
import MultiSelectDropdown, { type Option } from "~/commons/MultiSelectDropdown";
import StringFacet from "~/components/JcrQuery/Facets/Components/StringFacet";
import LongFacet from "~/components/JcrQuery/Facets/Components/LongFacet";
import DateFacet from "~/components/JcrQuery/Facets/Components/DateFacet";

import type { FacetProps } from "~/components/JcrQuery/types";

interface FacetItem {
  id: string;
  label: string;
  isActive: boolean;
  type: string;
  values?: string[];
  // component?: React.ReactNode;
}

const FacetsFilter = ({ facets, isEditMode }: { facets: FacetProps[]; isEditMode: boolean }) => {
  const Cmp = {
    STRING: StringFacet,
    LONG: LongFacet,
    DATE: DateFacet,
  };

  const [facetOrder, setFacetOrder] = useState<FacetItem[]>(
    facets.map((facet) => {
      return {
        id: facet.name,
        label: facet.displayName,
        isActive: facet.isActive,
        values: facet.values,
        type: facet.requiredType,
      };
    }),
  );

  const handleFacetChange = (selectedFacets: Option[]) => {
    //todo udpate filters and set facets isActive-> true and do the mutation to hidden fields facets
  };

  return (
    <div>
      <h2>Facets</h2>
      {isEditMode && (
        <MultiSelectDropdown
          options={facets.map(({ name, displayName, isActive }) => ({
            value: name,
            label: displayName,
            isActive,
          }))}
          placeholder="Choisis tes fruits"
          onChange={handleFacetChange}
        />
      )}
    </div>
  );
};

export default FacetsFilter;
