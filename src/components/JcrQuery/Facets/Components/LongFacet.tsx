import styles from "./LongFacet.module.css";
import type { Constraint, FacetProps } from "~/components/JcrQuery/types";

interface PriceFacetProps {
  facet: FacetProps;
  onChange: (id: string, values: Constraint[]) => void;
}

type Operator = ">=" | "<=";

const LongFacet: React.FC<PriceFacetProps> = ({ facet, onChange }) => {
  // const formatPrice = (price: number) => {
  //   return new Intl.NumberFormat("en-US", {
  //     style: "currency",
  //     currency: "USD",
  //     minimumFractionDigits: 0,
  //     maximumFractionDigits: 0,
  //   }).format(price);
  // };

  const getPriceRange = (facet) => {
    // Par défaut
    let min = 0;
    let max = 1000000;

    // Cherche la contrainte >= (min) et <= (max)
    const minConstraint = facet.constraints.find((c) => c.operator === ">=");
    const maxConstraint = facet.constraints.find((c) => c.operator === "<=");

    // Si présente, on prend la value, sinon on fallback sur facet.values
    min =
      minConstraint && minConstraint.value != null
        ? (minConstraint.value as number)
        : facet.values && facet.values.length
          ? facet.values[facet.values.length - 1] // fallback: dernier (généralement le plus grand/min selon ton tri)
          : min;

    max =
      maxConstraint && maxConstraint.value != null
        ? (maxConstraint.value as number)
        : facet.values && facet.values.length
          ? facet.values[0] // fallback: premier (généralement le plus petit/max selon ton tri)
          : max;

    return [min, max];
  };
  const priceRange = getPriceRange(facet);

  const handleRangeChange = (e: React.ChangeEvent<HTMLInputElement>, operator: Operator) => {
    const prop = facet.id;
    const value = parseInt(e.target.value) as number;

    // Récupère les min et max autorisés selon le range (à adapter selon ton besoin)
    const minAllowed = priceRange[0];
    const maxAllowed = priceRange[1];

    if (value < minAllowed || value > maxAllowed || Number.isNaN(value)) {
      return;
    }

    const newConstraints = [
      ...facet.constraints.filter(({ prop: p, operator: o }) => !(p === prop && o === operator)),
      ...(value !== undefined && value !== null
        ? [
            {
              prop,
              operator,
              value,
            },
          ]
        : []),
    ];
    onChange(facet.id, newConstraints);
  };

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => handleRangeChange(e, ">=");
  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => handleRangeChange(e, "<=");

  const getStep = (min: number, max: number): number => {
    const range = max - min;
    if (range <= 10000) return 100;
    if (range <= 100000) return 1000;
    if (range <= 1000000) return 10000;
    return Math.max(10000, Math.round(range / 100));
  };

  const getAllowedMin = () =>
    facet.values && facet.values.length ? (facet.values[0] as number) : 0;

  const getAllowedMax = () =>
    facet.values && facet.values.length
      ? (facet.values[facet.values.length - 1] as number)
      : 1000000;

  const allowedMin = getAllowedMin();
  const allowedMax = getAllowedMax();
  const step = getStep(allowedMin, allowedMax);

  const minPercent = (priceRange[0] / allowedMax) * 100;
  const maxPercent = (priceRange[1] / allowedMax) * 100;

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Price Range</h3>
      <div className={styles.sliderContainer}>
        <div className={styles.sliderWrapper}>
          <input
            type="range"
            min={allowedMin}
            max={allowedMax}
            step={step}
            value={priceRange[0]}
            onChange={handleMinChange}
            className={`${styles.slider} `}
          />
          <input
            type="range"
            min={allowedMin}
            max={allowedMax}
            step={step}
            value={priceRange[1]}
            onChange={handleMaxChange}
            className={`${styles.slider} `}
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
          {/*<span className={styles.value}>{formatPrice(priceRange[0])}</span>*/}
          {/*<span className={styles.value}>{formatPrice(priceRange[1])}</span>*/}
          <span className={styles.value}>{priceRange[0]}</span>
          <span className={styles.value}>{priceRange[1]}</span>
        </div>
      </div>
    </div>
  );
};

export default LongFacet;
