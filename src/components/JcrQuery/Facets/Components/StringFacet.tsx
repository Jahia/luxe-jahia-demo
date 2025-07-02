import classes from "./StringFacet.module.css";
import type { FacetCmpProps } from "~/components/JcrQuery/Facets/Components/types";

const StringFacet: React.FC<FacetCmpProps> = ({ facet, onChange }: FacetCmpProps) => {
  const handleValueChange = (value: string) => {
    if (facet.constraints.filter(({ value: v }) => v === value).length > 0) {
      onChange(
        facet.id,
        facet.constraints.filter(({ value: v }) => v !== value),
      );
    } else {
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
    <div className={classes.container}>
      <h3 className={classes.title}>{facet.label}</h3>
      <div className={classes.options}>
        {facet.values.map((value) => (
          <div
            key={value as string}
            className={classes.option}
            onClick={() => handleValueChange(value as string)}
          >
            <div
              className={`${classes.checkbox} ${facet.constraints.map(({ value }) => value).includes(value) ? classes.checked : ""}`}
            />
            <label className={classes.label}>{value as string}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StringFacet;
