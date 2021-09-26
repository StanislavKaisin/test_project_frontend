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
} from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router";
import { BASE_URL } from "../api/api.config";
import { IAlertProps } from "../pages/AlertPage";

function cutDescription(text: string, length: number): string {
  if (text.length <= length) return text;
  return text.slice(0, length).concat("...");
}

export const AlertsList = (props: { cards: IAlertProps[] }) => {
  const history = useHistory();
  const cards = props.cards;
  const defaultImg = "./no-image-found-360x250.png";
  return (
    <Container sx={{ py: 8 }} maxWidth="md">
      <Grid container spacing={4}>
        {cards.map((card) => (
          <Grid item key={card._id} xs={12} sm={6} md={4}>
            <Card
              sx={{ height: "100%", display: "flex", flexDirection: "column" }}
            >
              <CardActionArea
                onClick={() => {
                  history.push(`/alert/${card._id}`);
                }}
              >
                <CardMedia
                  component="img"
                  sx={{
                    // 16:9
                    pt: "56.25%",
                  }}
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
              {/* <CardActions>
                <Button size="small">View</Button>
                <Button size="small">Edit</Button>
              </CardActions> */}
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};
