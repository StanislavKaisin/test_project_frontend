import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Divider,
  Grid,
  Paper,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { RootState } from "../app/store";
import { useHistory } from "react-router";
import { getUserAlerts } from "../api/alert";
import { CommentsList } from "../components/CommentsList";
import { setLoader, unSetLoader } from "../redux/loaderSlice";
import { setMessage } from "../redux/messageSlice";
import { getUserComments } from "../api/comment";
import unSetCurrentUser from "../redux/userSlice";

export const UserPage = () => {
  const user = useAppSelector((state: RootState) => state.user);
  const history = useHistory();
  const dispatch = useAppDispatch();
  const [alerts, setalerts] = useState<null | any[]>(null);
  const [comments, setcomments] = useState<null | any[]>(null);

  useEffect(() => {
    if (!user.access_token) {
      history.push("user/signin");
    }
  }, []);

  const handleAlerts = async () => {
    dispatch(setLoader());
    try {
      const alertsFromDb = await getUserAlerts({ owner: user._id! });
      setalerts(alertsFromDb);
      dispatch(unSetLoader());
    } catch (error) {
      if (error instanceof Error) {
        dispatch(unSetLoader());
        dispatch(
          setMessage({
            snackbarOpen: true,
            snackbarType: "error",
            snackbarMessage: error.message,
          })
        );
      }
    }
  };

  const handleComments = async () => {
    dispatch(setLoader());
    try {
      const commentsFromDb = await getUserComments(user._id as string);
      setcomments(commentsFromDb);
      dispatch(unSetLoader());
    } catch (error) {
      if (error instanceof Error) {
        dispatch(unSetLoader());
        dispatch(
          setMessage({
            snackbarOpen: true,
            snackbarType: "error",
            snackbarMessage: error.message,
          })
        );
      }
    }
  };
  const handleLogOut = async () => {
    new Promise(async (resolve, reject) => {
      unSetCurrentUser(user, {
        type: "user",
        payload: user,
      });
      localStorage.removeItem("Pet!Alert");
      resolve(user);
    }).then((user) => {
      history.push("/");
    });
  };

  const theme = useTheme();
  const larger = useMediaQuery(theme.breakpoints.down("sm"));
  const spacing = larger ? 0 : 1;

  return (
    <Paper sx={{ p: 3 }}>
      <Box sx={{ mb: 3 }}>
        <Typography
          component="h1"
          variant="h5"
          align="center"
          style={{ fontWeight: 600, textTransform: "uppercase" }}
        >
          Personal data
        </Typography>
        <Grid container mt={2} spacing={spacing}>
          <Grid item xs={12} sm={6}>
            <Typography component="p" variant="h6" style={{ fontWeight: 600 }}>
              Name:
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography component="p" variant="h6">
              {user.name}
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={spacing}>
          <Grid item xs={12} sm={6}>
            <Typography component="p" variant="h6" style={{ fontWeight: 600 }}>
              E-mail:
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography component="p" variant="h6">
              {user.email}
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={spacing}>
          <Grid item xs={12} sm={6}>
            <Typography component="p" variant="h6" style={{ fontWeight: 600 }}>
              Phone:
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography component="p" variant="h6">
              {user.phone}
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={spacing}>
          <Grid item xs={12} sm={6}>
            <Typography component="p" variant="h6" style={{ fontWeight: 600 }}>
              Viber:
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography component="p" variant="h6">
              {user.viber ? user.viber : "No data found..."}
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={spacing}>
          <Grid item xs={12} sm={6}>
            <Typography component="p" variant="h6" style={{ fontWeight: 600 }}>
              Address:
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography component="p" variant="h6">
              {user.address ? user.address : "No data found..."}
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6}>
            <Button
              variant="outlined"
              onClick={() => {
                history.push("/user/update");
              }}
              fullWidth
            >
              Change personal data
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button variant="outlined" onClick={handleLogOut} fullWidth>
              Log out
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Divider sx={{ mb: 3 }} />
      <Accordion onChange={handleAlerts}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography style={{ fontWeight: 600 }}>Your alerts</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <CommentsList list={alerts as any[]} />
        </AccordionDetails>
      </Accordion>
      <Accordion onChange={handleComments}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography style={{ fontWeight: 600 }}>Your comments:</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <CommentsList list={comments as any[]} />
        </AccordionDetails>
      </Accordion>
    </Paper>
  );
};
