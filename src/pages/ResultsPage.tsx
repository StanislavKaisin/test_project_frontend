import React, { useEffect } from "react";
import { Container, Typography } from "@material-ui/core";
import { AlertsList } from "../components/AlertsList";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { RootState } from "../app/store";
import { fetchSearchResults } from "../redux/searchSlice";

const header = (query: string) => {
  // if (query === "") return `All alerts`;
  return `Results ${query}:`;
};

export const ResultsPage = () => {
  const query = useAppSelector((state: RootState) => state.search.query);
  const results = useAppSelector((state: RootState) => state.search.results);
  const dispatch = useAppDispatch();

  useEffect(() => {
    // if query '' and results null fetch all alerts
    if (query === "" && results === null) {
      dispatch(fetchSearchResults({ alert: "" }));
    }
  }, [results]);
  return (
    <Container>
      <Typography variant="h6" component="p">
        {header(query)}
      </Typography>
      {results && <AlertsList data={results} />}
    </Container>
  );
};
