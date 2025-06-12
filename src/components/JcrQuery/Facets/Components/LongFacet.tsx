import React from "react";
import styles from "./LongFacet.module.css";

interface PriceFacetProps {
  priceRange: [number, number];
  onChange: (range: [number, number]) => void;
}

const LongFacet: React.FC<PriceFacetProps> = ({ priceRange, onChange }) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMin = parseInt(e.target.value);
    if (newMin <= priceRange[1]) {
      onChange([newMin, priceRange[1]]);
    }
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMax = parseInt(e.target.value);
    if (newMax >= priceRange[0]) {
      onChange([priceRange[0], newMax]);
    }
  };

  const minPercent = (priceRange[0] / 1000000) * 100;
  const maxPercent = (priceRange[1] / 1000000) * 100;

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Price Range</h3>
      <div className={styles.sliderContainer}>
        <div className={styles.sliderWrapper}>
          <input
            type="range"
            min="0"
            max="1000000"
            step="10000"
            value={priceRange[0]}
            onChange={handleMinChange}
            className={`${styles.slider} ${styles.sliderMin}`}
          />
          <input
            type="range"
            min="0"
            max="1000000"
            step="10000"
            value={priceRange[1]}
            onChange={handleMaxChange}
            className={`${styles.slider} ${styles.sliderMax}`}
          />
          <div className={styles.sliderTrack}>
            <div
              className={styles.sliderRange}
              style={{
                left: `${minPercent}%`,
                width: `${maxPercent - minPercent}%`,
              }}
            ></div>
          </div>
        </div>
        <div className={styles.values}>
          <span className={styles.value}>{formatPrice(priceRange[0])}</span>
          <span className={styles.value}>{formatPrice(priceRange[1])}</span>
        </div>
      </div>
    </div>
  );
};

export default LongFacet;
