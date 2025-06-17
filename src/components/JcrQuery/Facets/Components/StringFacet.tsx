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
    if (facet.values.includes(value)) {
      onChange(facet.id, facet.values.filter((t) => t !== value) as string[]);
    } else {
      onChange(facet.id, [...facet.values, value] as string[]);
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
              className={`${styles.checkbox} ${facet.selectedTypes.includes(type) ? styles.checked : ""}`}
            />
            <label className={styles.label}>{value as string}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StringFacet;
