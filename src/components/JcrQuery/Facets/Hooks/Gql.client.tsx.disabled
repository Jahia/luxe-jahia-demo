import { useState, useCallback } from "react";

type GraphQLRequest = {
  query: string;
  variables?: object;
};

type GraphQLResult = {
  data: any;
  error: Error | null;
  loading: boolean;
  execute: (requests: GraphQLRequest | GraphQLRequest[], token?: string) => Promise<any>;
};

const GRAPHQL_ENDPOINT = "/modules/graphql";

export function useGraphQL(): GraphQLResult {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const execute = useCallback(
    async (requests: GraphQLRequest | GraphQLRequest[], token?: string) => {
      setLoading(true);
      setError(null);
      setData(null);

      const reqs = Array.isArray(requests) ? requests : [requests];

      try {
        const results = await Promise.all(
          reqs.map(async ({ query, variables }) => {
            const res = await fetch(GRAPHQL_ENDPOINT, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                ...(token ? { Authorization: `Bearer ${token}` } : {}),
              },
              body: JSON.stringify({ query, variables }),
            });
            if (!res.ok) {
              throw new Error(`GraphQL error: ${res.status} ${res.statusText}`);
            }
            const result = await res.json();
            if (result.errors) {
              throw new Error(`GraphQL error: ${JSON.stringify(result.errors)}`);
            }
            return result.data;
          }),
        );
        setData(reqs.length === 1 ? results[0] : results);
        return reqs.length === 1 ? results[0] : results;
      } catch (err) {
        setError(err as Error);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  return { data, error, loading, execute };
}
