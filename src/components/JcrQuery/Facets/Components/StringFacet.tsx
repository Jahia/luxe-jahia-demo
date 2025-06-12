import React from "react";
import styles from "./StringFacet.module.css";

const propertyTypes = ["House", "Apartment", "Building", "Condo", "Townhouse", "Villa"];

interface TypeFacetProps {
  selectedTypes: string[];
  onChange: (types: string[]) => void;
}

const StringFacet: React.FC<TypeFacetProps> = ({ selectedTypes, onChange }) => {
  const handleTypeChange = (type: string) => {
    if (selectedTypes.includes(type)) {
      onChange(selectedTypes.filter((t) => t !== type));
    } else {
      onChange([...selectedTypes, type]);
    }
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Property Type</h3>
      <div className={styles.options}>
        {propertyTypes.map((type) => (
          <div key={type} className={styles.option} onClick={() => handleTypeChange(type)}>
            <div
              className={`${styles.checkbox} ${selectedTypes.includes(type) ? styles.checked : ""}`}
            />
            <label className={styles.label}>{type}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StringFacet;
