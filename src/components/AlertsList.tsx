import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
  CardActionArea,
  useTheme,
  useMediaQuery,
  Skeleton,
} from "@material-ui/core";
import { useHistory } from "react-router";
import { BASE_URL } from "../api/api.config";
import { IAlertProps } from "../pages/AlertPage";
import Pagination from "@mui/material/Pagination";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { fetchSearchResults } from "../redux/searchSlice";
import { cutDescription } from "../helpers/cutDescription";
import Favorite from "@mui/icons-material/Favorite";
import { RootState } from "../app/store";

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
  items?: IAlertProps[];
  meta?: {
    query: string;
    currentPage: number;
    itemCount: number;
    itemsPerPage: number;
    totalItems: number;
    totalPages: number;
  };
}

type IAlertsListProps = ISearchAlertProps | IAlertProps[];

export const AlertsList = (props: { data: IAlertsListProps }) => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const query = useAppSelector((state: RootState) => state.search.query);

  const theme = useTheme();
  const larger = useMediaQuery(theme.breakpoints.down("sm"));
  const paginationSize = larger ? "small" : "large";

  let cards;
  if ((props.data as ISearchAlertProps).docs) {
    cards = (props.data as ISearchAlertProps).docs;
  } else {
    cards = props.data as IAlertProps[];
  }
  if ((props.data as ISearchAlertProps).items) {
    cards = (props.data as ISearchAlertProps).items;
  }

  const defaultImg = "./no-image-found-360x250.png";

  const [page, setPage] = React.useState(1);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    dispatch(fetchSearchResults({ alert: query, pageNumber: value }));
  };

  const totalPages = (props.data as ISearchAlertProps).totalPages
    ? (props.data as ISearchAlertProps).totalPages
    : (props.data as ISearchAlertProps).meta?.totalPages;

  return (
    <Container sx={{ py: 8 }} maxWidth="md" data-testid="AlertsList">
      {cards && cards.length ? (
        <>
          <Grid container spacing={4}>
            {cards &&
              cards.map((card) => (
                <Grid item key={card._id} xs={12} sm={6} md={4}>
                  <Card
                    sx={{
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
                        sx={{}}
                        image={
                          card.img ? `${BASE_URL}/${card.img}` : defaultImg
                        }
                        alt={card.title}
                      />
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Typography gutterBottom variant="h5" component="h2">
                          Title: {cutDescription(card.title, 25)}
                        </Typography>
                        <Typography
                          variant="caption"
                          component="p"
                        >{`Number of views: ${
                          card.numberOfViews
                            ? card.numberOfViews
                            : card.number_of_views
                        }`}</Typography>
                        {(card?.searchForOwner == true ||
                          card?.search_for_owner == true) && (
                          <Grid
                            container
                            direction="row"
                            alignContent="center"
                            sx={{
                              alignItems: "center",
                              color: theme.palette.error.light,
                              textShadow: "1px 1px 2px",
                            }}
                          >
                            <Favorite />
                            <Typography
                              variant="caption"
                              component="p"
                            >{`Searching for owner!`}</Typography>
                          </Grid>
                        )}
                        <Typography>
                          Description: {cutDescription(card.description, 25)}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              ))}
          </Grid>
          <Grid container justifyContent="center" sx={{ mt: 3 }}>
            {totalPages && (
              <Pagination
                count={totalPages}
                variant="outlined"
                shape="rounded"
                size={paginationSize}
                siblingCount={0}
                page={page}
                onChange={handleChange}
                showFirstButton
                showLastButton
              />
            )}
          </Grid>
        </>
      ) : (
        <Typography variant="h6" component="p">{`Not found`}</Typography>
      )}
    </Container>
  );
};
