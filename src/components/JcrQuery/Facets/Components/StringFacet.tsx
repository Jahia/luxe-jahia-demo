import React from "react";
import styles from "./StringFacet.module.css";
import type { FacetItem } from "~/components/JcrQuery/Facets/FacetsFilter.client";

// const propertyTypes = ["House", "Apartment", "Building", "Condo", "Townhouse", "Villa"];

interface StringFacetProps {
  facet: FacetItem;
  onChange: (id: string, values: string[]) => void;
}

const StringFacet: React.FC<StringFacetProps> = ({ facet, onChange }: StringFacetProps) => {
  const handleTypeChange = (value: string) => {
    if (facet.selectedValues.includes(value)) {
      // console.log("Removing value:", value);
      onChange(facet.id, facet.selectedValues.filter((t) => t !== value) as string[]);
    } else {
      // console.log("Adding value:", value);
      onChange(facet.id, [...facet.selectedValues, value] as string[]);
    }
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Property Type</h3>
      <div className={styles.options}>
        {facet.values.map((value) => (
          <div
            key={value as string}
            className={styles.option}
            onClick={() => handleTypeChange(value as string)}
          >
            <div
              className={`${styles.checkbox} ${facet.selectedValues.includes(value) ? styles.checked : ""}`}
            />
            <label className={styles.label}>{value as string}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StringFacet;
