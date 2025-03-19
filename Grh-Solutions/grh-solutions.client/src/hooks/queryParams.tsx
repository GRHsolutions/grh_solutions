import { useEffect, useState } from "react";

type QueryParams = {
  [key: string]: string;
};

export const UseQueryParams = () => {
  const [queryParams, setQueryParams] = useState<QueryParams>({});
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const params: QueryParams = {};
    for (const [key, value] of queryParams.entries()) {
      params[key] = value;
    }
    setQueryParams(params);
  }, [window.location.search]);
  return { queryParams };
};
