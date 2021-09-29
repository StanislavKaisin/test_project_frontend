import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
  CardActionArea,
  Stack,
} from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router";
import { BASE_URL } from "../api/api.config";
import { IAlertProps } from "../pages/AlertPage";
import Pagination from "@mui/material/Pagination";
import { useAppDispatch } from "../app/hooks";
import { fetchSearchResults } from "../redux/searchSlice";

function cutDescription(text: string, length: number): string {
  if (text.length <= length) return text;
  return text.slice(0, length).concat("...");
}

interface ISearchAlertProps {
  docs: IAlertProps[];
  hasNextPage: boolean;
  hasPrevPage: boolean;
  limit: number;
  nextPage: null | true;
  page: number;
  pagingCounter: number;
  prevPage: null | true;
  totalDocs: number;
  totalPages: number;
}

type IAlertsListProps = ISearchAlertProps | IAlertProps[];

export const AlertsList = (props: { data: IAlertsListProps }) => {
  const history = useHistory();
  const dispatch = useAppDispatch();

  // console.log(`data`, props.data);
  let cards;
  if ((props.data as ISearchAlertProps).docs) {
    cards = (props.data as ISearchAlertProps).docs;
  } else {
    cards = props.data as IAlertProps[];
  }

  const defaultImg = "./no-image-found-360x250.png";

  const [page, setPage] = React.useState(1);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    dispatch(fetchSearchResults({ alert: "", pageNumber: value }));
  };

  return (
    <Container sx={{ py: 8 }} maxWidth="md">
      <Grid container spacing={4}>
        {cards &&
          cards.map((card) => (
            <Grid item key={card._id} xs={12} sm={6} md={4}>
              <Card
                sx={{
                  // height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardActionArea
                  onClick={() => {
                    history.push(`/alert/${card._id}`);
                  }}
                >
                  <CardMedia
                    component="img"
                    sx={
                      {
                        // 16:9
                        // pt: "56.25%",
                      }
                    }
                    image={card.img ? `${BASE_URL}/${card.img}` : defaultImg}
                    alt={card.title}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {card.title}
                    </Typography>
                    <Typography
                      variant="caption"
                      component="p"
                    >{`Number of views: ${card.numberOfViews}`}</Typography>
                    <Typography>
                      {cutDescription(card.description, 25)}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
      </Grid>
      <Grid container justifyContent="center" sx={{ mt: 3 }}>
        {(props.data as ISearchAlertProps).docs && (
          <Pagination
            count={(props.data as ISearchAlertProps).totalPages}
            variant="outlined"
            shape="rounded"
            size="large"
            siblingCount={0}
            page={page}
            onChange={handleChange}
            showFirstButton
            showLastButton
          />
        )}
      </Grid>
    </Container>
  );
};
