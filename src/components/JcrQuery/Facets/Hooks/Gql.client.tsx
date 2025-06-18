import { useState, useCallback } from "react";

type UpdateFacetFieldsVars = {
  pathsOrIds: string[];
  facetFields: string[];
};

type UpdateFacetFieldsResult = {
  data: object | null;
  error: Error | null;
  loading: boolean;
  mutate: (variables: UpdateFacetFieldsVars) => Promise<void>;
};

const UPDATE_FACET_FIELDS_MUTATION = `
mutation UpdateFacetFields($pathsOrIds: [String!]!, $facetFields: [String!]!) {
  jcr {
    mutateNodes(pathsOrIds: $pathsOrIds) {
      mutateProperty(name: "facetFields") {
        setValues(values: $facetFields)
        property {
          values
        }
      }
    }
  }
}
`;

const GRAPHQL_ENDPOINT = "/modules/graphql";

export function useUpdateJcrQueryFacetFields(token?: string): UpdateFacetFieldsResult {
  const [data, setData] = useState<object | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const mutate = useCallback(
    async (variables: UpdateFacetFieldsVars) => {
      setLoading(true);
      setError(null);
      setData(null);

      try {
        const res = await fetch(GRAPHQL_ENDPOINT, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          body: JSON.stringify({
            query: UPDATE_FACET_FIELDS_MUTATION,
            variables,
          }),
        });

        if (!res.ok) {
          throw new Error(`GraphQL error: ${res.status} ${res.statusText}`);
        }

        const result = await res.json();
        if (result.errors) {
          throw new Error(`GraphQL error: ${JSON.stringify(result.errors)}`);
        }
        setData(result.data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    },
    [token],
  );

  return { data, error, loading, mutate };
}
