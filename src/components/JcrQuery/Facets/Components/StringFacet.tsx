import React from "react";
import styles from "./StringFacet.module.css";
import type { Constraint, FacetProps } from "~/components/JcrQuery/types";
import type { JCRQueryBuilderType } from "~/components/JcrQuery/JCRQueryBuilder";

// const propertyTypes = ["House", "Apartment", "Building", "Condo", "Townhouse", "Villa"];

interface StringFacetProps {
  facet: FacetProps;
  onChange: (id: string, values: Constraint[]) => void;
  builder: JCRQueryBuilderType;
}

const StringFacet: React.FC<StringFacetProps> = ({ facet, onChange }: StringFacetProps) => {
  const handleTypeChange = (value: string) => {
    if (facet.constraints.filter(({ value: v }) => v === value).length > 0) {
      // console.log("Removing value:", value);
      onChange(
        facet.id,
        facet.constraints.filter(({ value: v }) => v !== value),
      );
    } else {
      // console.log("Adding value:", value);
      onChange(facet.id, [
        ...facet.constraints,
        {
          prop: facet.id,
          operator: "=",
          value: value,
        },
      ]);
    }
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>{facet.label}</h3>
      <div className={styles.options}>
        {facet.values.map((value) => (
          <div
            key={value as string}
            className={styles.option}
            onClick={() => handleTypeChange(value as string)}
          >
            <div
              className={`${styles.checkbox} ${facet.constraints.map(({ value }) => value).includes(value) ? styles.checked : ""}`}
            />
            <label className={styles.label}>{value as string}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StringFacet;
