import * as React from "react";
import Box from "@mui/material/Box";
import AccountCircle from "@mui/icons-material/AccountCircle";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import { useHistory } from "react-router-dom";
import { BottomNavigation, BottomNavigationAction } from "@material-ui/core";

export default function MenuAppBar() {
  const history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    history.push("/user");
  };
  const handleClose = () => {
    setAnchorEl(null);
    history.push("user");
  };
  const [value, setValue] = React.useState(1);

  return (
    <Box sx={{ width: "100%", height: 4 }}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        sx={{
          width: "100%",
          justifyContent: "space-between",
        }}
        id="back-to-top-anchor"
      >
        <BottomNavigationAction
          label="Add alert"
          icon={<WarningAmberRoundedIcon fontSize="large" />}
          color="secondary"
          sx={{
            "& .MuiBottomNavigationAction-label": {
              fontSize: { xs: "0.8rem", sm: "1rem" },
              fontWeight: "bold",
              color: "secondary",
            },
          }}
          onClick={(event) => {
            history.push("/alert");
          }}
        />
        <BottomNavigationAction
          label="Pet!Alert"
          icon={null}
          sx={{
            "& .MuiBottomNavigationAction-label": {
              fontSize: { xs: "1.5rem", sm: "2rem" },
              fontWeight: "bold",
              color: "primary",
            },
          }}
          onClick={(event) => {
            history.push("/");
          }}
        />
        <BottomNavigationAction
          label="Profile"
          icon={<AccountCircle fontSize="large" />}
          sx={{
            "& .MuiBottomNavigationAction-label": {
              fontSize: { xs: "0.8rem", sm: "1rem" },
              fontWeight: "bold",
              color: "secondary",
            },
          }}
          onClick={(event) => {
            history.push("/user");
          }}
        />
      </BottomNavigation>
    </Box>
  );
}
