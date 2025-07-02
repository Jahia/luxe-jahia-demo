import type { Constraint, FacetProps } from "~/components/JcrQuery/types";

export interface FacetCmpProps {
  facet: FacetProps;
  onChange: (id: string, values: Constraint[]) => void;
}
