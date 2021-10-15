import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Container,
  Divider,
  Grid,
  ImageListItem,
  Paper,
  Typography,
  useTheme,
} from "@material-ui/core";
import { useHistory } from "react-router";
import { getAlert } from "../api/alert";
import { BASE_URL } from "../api/api.config";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { setLoader, unSetLoader } from "../redux/loaderSlice";
import { setMessage } from "../redux/messageSlice";
import AddComment from "../components/AddComment";
import { getAlertComments } from "../api/comment";
import { RootState } from "../app/store";
import QRCode from "react-qr-code";
import { useReactToPrint } from "react-to-print";
import { AlertPageToPrint } from "./AlertPageToPrint";

interface IUser {
  name: string;
  email: string;
  phone: string;
  viber: string;
}

export interface IAlertProps {
  _id: string;
  title: string;
  img: string;
  createdAt: string;
  numberOfViews: number;
  user: IUser[];
  description: string;
  phone: string;
  viber: string;
  qr?: string;
  searchForOwner?: boolean;
}

export interface IComments {
  _id: string;
  description: string;
  user: IUser[];
}

export const AlertPage = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state: RootState) => state.user);
  const [alert, setAlert] = useState<null | IAlertProps>(null);
  const [comments, setComments] = useState<null | IComments[]>(null);
  const theme = useTheme();
  // @ts-ignore
  const id = history.location.pathname.split("/").at(-1);
  useEffect(() => {
    dispatch(setLoader());
    getAlert(id)
      .then((data) => {
        setAlert(data);
        dispatch(unSetLoader());
      })
      .catch((error) => {
        dispatch(
          setMessage({
            snackbarOpen: true,
            snackbarType: "error",
            snackbarMessage: error.message,
          })
        );
        dispatch(unSetLoader());
      })
      .finally(() => {
        dispatch(unSetLoader());
      });
    getAlertComments(id)
      .then((data) => {
        setComments(data);
        dispatch(unSetLoader());
      })
      .catch((error) => {
        dispatch(
          setMessage({
            snackbarOpen: true,
            snackbarType: "error",
            snackbarMessage: error.message,
          })
        );
        dispatch(unSetLoader());
      })
      .finally(() => {
        dispatch(unSetLoader());
      });
  }, []);
  const defaultImg = process.env.PUBLIC_URL + "/no-image-found-360x250.png";

  const handleAddComment = async () => {
    if (!user.access_token) {
      dispatch(
        setMessage({
          snackbarOpen: true,
          snackbarType: "warning",
          snackbarMessage: "To add a comment, please sign in.",
        })
      );
    }
    dispatch(setLoader());
    try {
      const comments = await getAlertComments(id);
      setComments(comments);
      dispatch(unSetLoader());
    } catch (error) {
      if (error instanceof Error) {
        dispatch(
          setMessage({
            snackbarOpen: true,
            snackbarType: "error",
            snackbarMessage: error.message,
          })
        );
        dispatch(unSetLoader());
      }
    }
  };

  const photo = alert?.img ? `${BASE_URL}/${alert.img}` : defaultImg;

  const fullPagePath = window.location.href;
  // const fullPagePath = `http://192.168.0.102:3001/${history.location.pathname}`;

  if (fullPagePath && alert) {
    alert["qr"] = fullPagePath;
  }
  const componentRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <>
      {alert && (
        <Container maxWidth="lg">
          <Paper>
            <Grid container direction="column">
              <Typography variant="h4" component="h1" align="center">
                {alert.title}
              </Typography>
              <ImageListItem key={8} sx={{ margin: "0 auto" }}>
                <img
                  src={photo}
                  width="360"
                  height="250"
                  alt={alert.title}
                  loading="lazy"
                />
              </ImageListItem>
              {alert?.searchForOwner == true && (
                <Grid
                  container
                  direction="row"
                  alignContent="center"
                  justifyContent="center"
                  sx={{
                    alignItems: "center",
                    color: theme.palette.error.light,
                    textShadow: "1px 1px 2px",
                  }}
                >
                  <Typography
                    variant="caption"
                    component="p"
                  >{`Searching for owner!`}</Typography>
                </Grid>
              )}
              <Typography
                variant="body1"
                component="p"
                align="center"
                sx={{ paddingLeft: "1rem", paddingRight: "1rem" }}
              >
                {alert.description}
              </Typography>
              <Divider variant="middle" />

              <Grid container sx={{ paddingLeft: "1rem" }}>
                <Grid item xs={12} sm={6}>
                  <Typography
                    variant="caption"
                    component="p"
                  >{`Author: `}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="caption" component="p">{` ${
                    alert.user[0] ? alert.user[0].name : "User not found"
                  }`}</Typography>
                </Grid>
              </Grid>
              <Divider variant="middle" />
              <Grid container sx={{ paddingLeft: "1rem" }}>
                <Grid item xs={12} sm={6}>
                  <Typography
                    variant="caption"
                    component="p"
                  >{` Viber:`}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography
                    variant="caption"
                    component="a"
                    href={`tel:${alert.viber ? alert.viber : ""}`}
                  >{`${alert.viber ? alert.viber : ""}`}</Typography>
                </Grid>
              </Grid>
              <Divider variant="middle" />
              <Grid container sx={{ paddingLeft: "1rem" }}>
                <Grid item xs={12} sm={6}>
                  <Typography
                    variant="caption"
                    component="p"
                  >{` Phone:`}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography
                    variant="caption"
                    component="a"
                    href={`tel:${alert.phone}`}
                  >{`${alert.phone}`}</Typography>
                </Grid>
              </Grid>
              <Divider variant="middle" />
              <Grid container sx={{ paddingLeft: "1rem" }}>
                <Grid item xs={12} sm={6}>
                  <Typography
                    variant="caption"
                    component="p"
                  >{`Number of views:`}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography
                    variant="caption"
                    component="p"
                  >{`${alert.numberOfViews}`}</Typography>
                </Grid>
              </Grid>
              <Divider variant="middle" />
              <Grid container sx={{ paddingLeft: "1rem" }}>
                <Grid item xs={12} sm={6}>
                  <Typography
                    variant="caption"
                    component="p"
                  >{` Published: `}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="caption" component="p">{` ${new Date(
                    alert.createdAt
                  ).toLocaleDateString()}`}</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Divider />
            {/* next lines will work correctly only when server and frontend apps run in production */}
            <Grid
              item
              alignContent="center"
              sx={{
                mt: 1,
                mb: 1,
              }}
            >
              <div
                style={{
                  textAlign: "center",
                }}
              >
                <QRCode value={fullPagePath} size={128} />
              </div>
            </Grid>

            <Divider />
            <Grid container sx={{ mb: 2, mt: 2 }} spacing={2}>
              <Grid item alignContent="center" xs={12} sm={6}>
                <AddComment cb={handleAddComment} />
              </Grid>
              <Grid item alignContent="center" xs={12} sm={6}>
                <Button fullWidth variant="outlined" onClick={handlePrint}>
                  Print alert
                </Button>
                <div style={{ display: "none" }}>
                  {/* @ts-ignore */}
                  <AlertPageToPrint alert={alert} ref={componentRef} />
                </div>
              </Grid>
            </Grid>
            {comments && comments.length > 0 && (
              <>
                <Divider />
                <Typography
                  sx={{ ml: 2, fontSize: "1.2rem", fontWeight: "bold" }}
                  variant="caption"
                  component="p"
                >{`Comments: `}</Typography>
                <Divider />
              </>
            )}

            {comments &&
              comments.length > 0 &&
              comments.map((comment) => {
                return (
                  <>
                    <Grid
                      container
                      direction="row"
                      sx={{ padding: "0.5rem" }}
                      key={comment._id}
                    >
                      <Grid item xs={12} sm={6}>
                        <Typography
                          variant="caption"
                          component="p"
                          style={{ fontWeight: 600 }}
                        >{`${
                          comment.user[0].name
                            ? comment.user[0].name
                            : "User not found"
                        }:`}</Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography
                          variant="caption"
                          component="p"
                        >{`${comment.description}`}</Typography>
                      </Grid>
                      <Divider
                        sx={{
                          width: "80%",
                        }}
                        variant="middle"
                      />
                    </Grid>
                  </>
                );
              })}
          </Paper>
        </Container>
      )}
    </>
  );
};
