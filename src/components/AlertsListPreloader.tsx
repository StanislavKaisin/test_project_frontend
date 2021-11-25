import { Grid, Paper, Skeleton } from "@material-ui/core";

export const AlertsListPreloader = () => {
  const cards: number[] = [];
  cards.length = 10;
  cards.fill(1);
  return (
    <>
      <Grid
        container
        spacing={4}
        sx={{ padding: "64px 24px" }}
        data-testid="AlertsPagePreloader"
      >
        {cards &&
          cards.map((card, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <Paper sx={{ padding: 1 }}>
                <Skeleton
                  variant="rectangular"
                  animation="wave"
                  width="100%"
                  height={200}
                />
                <Skeleton variant="text" animation="wave" />
                <Skeleton variant="text" animation="wave" />
                <Skeleton variant="text" animation="wave" />
                <Skeleton variant="text" animation="wave" />
              </Paper>
            </Grid>
          ))}
      </Grid>
    </>
  );
};
