import {
  Container,
  Grid,
  ImageListItem,
  Paper,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { getAlert } from "../api/alert";
import { BASE_URL } from "../api/api.config";
import { useAppDispatch } from "../app/hooks";
import { setLoader, unSetLoader } from "../redux/loaderSlice";
import { setMessage } from "../redux/messageSlice";

function srcset(
  image: string,
  width: number,
  height: number,
  rows = 1,
  cols = 1
) {
  const result = {
    src: `${BASE_URL}/${image}`,
    srcSet: `${BASE_URL}/${image}`,
  };
  return result;
}

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

export const AlertPage = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const [alert, setAlert] = useState<null | IAlertProps>(null);
  useEffect(() => {
    // @ts-ignore
    const id = history.location.pathname.split("/").at(-1);
    dispatch(setLoader());
    getAlert(id)
      .then((data) => {
        setAlert(data[0]);
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

              <Grid
                container
                direction="row"
                sx={{ padding: "1rem" }}
                columns={16}
              >
                <Grid item xs={8}>
                  <Typography
                    variant="body2"
                    component="p"
                  >{`Author: ${alert.user[0].name}`}</Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography
                    variant="body2"
                    component="p"
                  >{` Viber: ${alert.viber}`}</Typography>
                </Grid>
              </Grid>
              <Grid
                container
                direction="row"
                sx={{ padding: "0.5rem" }}
                columns={16}
              >
                <Grid item xs={8}>
                  <Typography
                    variant="caption"
                    component="p"
                  >{`Number of views: ${alert.numberOfViews}`}</Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography
                    variant="caption"
                    component="p"
                  >{` Published: ${new Date(
                    alert.createdAt
                  ).toLocaleDateString()}`}</Typography>
                </Grid>
              </Grid>
              <Typography
                variant="body1"
                component="p"
                sx={{ paddingLeft: "1rem", paddingRight: "1rem" }}
              >
                {alert.description}
              </Typography>
            </Grid>
          </Paper>
        </Container>
      )}
    </>
  );
};
