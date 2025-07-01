import styles from "./LongFacet.module.css";
import type { Constraint, FacetProps } from "~/components/JcrQuery/types";
import React from "react";

interface PriceFacetProps {
  facet: FacetProps;
  onChange: (id: string, values: Constraint[]) => void;
}

type Operator = ">=" | "<=";

let min = 0;
let max = 1000000;

const getStep = (min: number, max: number): number => {
  const range = max - min;
  if (range <= 10000) return 100;
  if (range <= 100000) return 1000;
  if (range <= 1000000) return 10000;
  return Math.max(10000, Math.round(range / 100));
};

const getPriceRange = (facet: FacetProps) => {
  // Cherche la contrainte >= (min) et <= (max)
  const minConstraint = facet.constraints.find((c) => c.operator === ">=");
  const maxConstraint = facet.constraints.find((c) => c.operator === "<=");

  // Si présente, on prend la value, sinon on fallback sur facet.values
  min =
    minConstraint && minConstraint.value != null
      ? (minConstraint.value as number)
      : facet.values && facet.values.length
        ? (facet.values[0] as number)
        : min;

  max =
    maxConstraint && maxConstraint.value != null
      ? (maxConstraint.value as number)
      : facet.values && facet.values.length
        ? (facet.values[facet.values.length - 1] as number)
        : max;

  return [min, max];
};

const LongFacet: React.FC<PriceFacetProps> = ({ facet, onChange }) => {
  // const formatPrice = (price: number) => {
  //   return new Intl.NumberFormat("en-US", {
  //     style: "currency",
  //     currency: "USD",
  //     minimumFractionDigits: 0,
  //     maximumFractionDigits: 0,
  //   }).format(price);
  // };

  const priceRange = getPriceRange(facet);

  const [localMin, setLocalMin] = React.useState(priceRange[0]);
  const [localMax, setLocalMax] = React.useState(priceRange[1]);

  // Met à jour la valeur locale pendant le drag
  const handleMinInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalMin(Number(e.target.value));
  };
  const handleMaxInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalMax(Number(e.target.value));
  };

  const allowedMin = facet.values && facet.values.length ? (facet.values[0] as number) : 0;

  const allowedMax =
    facet.values && facet.values.length ? (facet.values[facet.values.length - 1] as number) : max;

  const step = getStep(allowedMin, allowedMax);

  const handleRangeChange = (e: React.MouseEvent<HTMLInputElement>, operator: Operator) => {
    const prop = facet.id;
    const target = e.target as HTMLInputElement;
    const value = parseInt(target.value, 10);

    if (Number.isNaN(value)) return;
    if (operator === ">=" && value > localMax) return;
    if (operator === "<=" && value < localMin) return;

    const newConstraints = [
      ...facet.constraints.filter(({ prop: p, operator: o }) => !(p === prop && o === operator)),
      {
        prop,
        operator,
        value,
      },
    ];
    onChange(facet.id, newConstraints);
  };

  // commit value changes
  const commitMin = (e: React.MouseEvent<HTMLInputElement>) => handleRangeChange(e, ">=");
  const commitMax = (e: React.MouseEvent<HTMLInputElement>) => handleRangeChange(e, "<=");

  //local touch events
  const handleMinTouchEnd = (e) => commitMin(e);
  const handleMaxTouchEnd = (e) => commitMax(e);

  React.useEffect(() => {
    setLocalMin(priceRange[0]);
    setLocalMax(priceRange[1]);
  }, [priceRange[0], priceRange[1]]);

  const minPercent = ((localMin - allowedMin) / allowedMax) * 100;
  const maxPercent = (localMax / allowedMax) * 100;

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>{facet.label}</h3>
      <div className={styles.sliderContainer}>
        <div className={styles.sliderWrapper}>
          <div className={styles.sliderTrack}>
            <div
              className={styles.sliderRange}
              style={{
                left: `${minPercent}%`,
                width: `${maxPercent - minPercent}%`,
              }}
            ></div>
          </div>

          <input
            type="range"
            min={allowedMin}
            max={allowedMax}
            step={step}
            value={localMin}
            onChange={handleMinInput}
            onMouseUp={commitMin}
            onTouchEnd={handleMinTouchEnd}
            className={`${styles.slider} `}
          />
          <input
            type="range"
            min={allowedMin}
            max={allowedMax}
            step={step}
            value={localMax}
            onChange={handleMaxInput}
            onMouseUp={commitMax}
            onTouchEnd={handleMaxTouchEnd}
            className={`${styles.slider} `}
          />
        </div>
        <div className={styles.values}>
          {/*<span className={styles.value}>{formatPrice(priceRange[0])}</span>*/}
          {/*<span className={styles.value}>{formatPrice(priceRange[1])}</span>*/}
          <span className={styles.value}>{localMin}</span>
          <span className={styles.value}>{localMax}</span>
        </div>
      </div>
    </div>
  );
};

export default LongFacet;
