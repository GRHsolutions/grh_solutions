import React from "react";

type QueryParams = {
  [key: string]: string;
};

export interface PageParams {
  type: string | undefined;
  action: string | undefined;
  id: number | undefined;
};

export const UseQueryParams = () => {
  const [queryParams, setQueryParams] = React.useState<QueryParams>({});
  React.useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const params: QueryParams = {};
    for (const [key, value] of queryParams.entries()) {
      params[key] = value;
    }
    setQueryParams(params);
  }, [window.location.search]);
  return { queryParams };
};
