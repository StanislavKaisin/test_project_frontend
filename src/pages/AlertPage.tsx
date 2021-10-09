import React, { useEffect, useState } from "react";
import {
  Container,
  Divider,
  Grid,
  ImageListItem,
  Paper,
  Typography,
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

  return (
    <>
      {alert && (
        <Container maxWidth="lg">
          <Paper>
            <Grid container direction="column">
              <Typography variant="h3" component="h1" align="center">
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
            <Grid item sx={{ mb: 2 }} alignContent="center">
              <AddComment cb={handleAddComment} />
            </Grid>
            <Divider />
            {comments &&
              comments.length > 0 &&
              comments.map((comment) => {
                return (
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
                );
              })}
          </Paper>
        </Container>
      )}
    </>
  );
};
