import * as React from "react";
import Box from "@mui/material/Box";
import { LinearProgress } from "@material-ui/core";

export default function Loader() {
  return (
    <Box
      sx={{
        width: "100%",
        position: "fixed",
        bottom: 0,
      }}
    >
      <LinearProgress />
    </Box>
  );
}
