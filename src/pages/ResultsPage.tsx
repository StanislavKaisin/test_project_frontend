import React, { useEffect } from "react";
import { Container, Typography } from "@material-ui/core";
import { AlertsList } from "../components/AlertsList";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { RootState } from "../app/store";
import { fetchSearchResults } from "../redux/searchSlice";
import { AlertsListPreloader } from "../components/AlertsListPreloader";

const header = (query: string) => {
  return query ? `Serach results for "${query}":` : `All alerts:`;
};

export const ResultsPage = () => {
  const query = useAppSelector((state: RootState) => state.search.query);
  const results = useAppSelector((state: RootState) => state.search.results);
  const loading = useAppSelector(
    (state: RootState) => state.loader.value.loading
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (query === "" && results === null) {
      dispatch(fetchSearchResults({ alert: "" }));
    }
  }, [results]);

  return (
    <Container>
      <Typography variant="h6" component="p" data-testid="resultsListTitile">
        {header(query)}
      </Typography>
      {loading ? <AlertsListPreloader /> : null}
      {results ? <AlertsList data={results} /> : null}
    </Container>
  );
};
