import { Paper, Skeleton } from "@material-ui/core";
import React from "react";

export const AlertsPagePreloader = () => {
  return (
    <>
      <Paper sx={{ padding: 1 }} data-testid="AlertsPagePreloader">
        <Skeleton
          variant="rectangular"
          animation="wave"
          width="100%"
          height={400}
          sx={{ marginBottom: 2 }}
        />
        <Skeleton
          variant="rectangular"
          animation="wave"
          width="100%"
          height={50}
          sx={{ marginBottom: 2 }}
        />
        <Skeleton
          variant="rectangular"
          animation="wave"
          width="100%"
          height={50}
          sx={{ marginBottom: 2 }}
        />
        <Skeleton
          variant="rectangular"
          animation="wave"
          width="100%"
          height={50}
          sx={{ marginBottom: 2 }}
        />
      </Paper>
    </>
  );
};
