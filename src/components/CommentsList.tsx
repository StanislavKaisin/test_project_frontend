import * as React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import { cutDescription } from "../helpers/cutDescription";
import { useHistory } from "react-router";
import { Paper, Typography } from "@material-ui/core";

export interface ICommentsListProps {
  list: IItem[];
}
export interface IItem {
  _id: string;
  title: string;
  description: string;
  alertId?: string;
  alert?: {
    _id: number;
    title: string;
  };
}

export const CommentsList = (props: ICommentsListProps) => {
  const history = useHistory();
  const list = props.list;
  return (
    <Box
      sx={{
        width: "100%",
        bgcolor: "background.paper",
      }}
    >
      {list && list.length ? (
        <List>
          {list &&
            list.length &&
            list.map((item) => {
              let alertId: string;
              if (item.alertId) {
                alertId = item.alertId + "";
              } else if (item.alert) {
                alertId = item.alert._id + "";
              }
              if (!item.alertId && !item.alert) {
                alertId = item._id;
              }

              return (
                <React.Fragment key={item._id}>
                  <ListItem
                    disablePadding
                    key={item._id}
                    onClick={() => {
                      alertId
                        ? history.push(`alert/${alertId}`)
                        : history.push(`/`);
                    }}
                  >
                    <ListItemButton>
                      <Paper sx={{ width: "100%", padding: "0.2rem" }}>
                        <Typography sx={{ fontWeight: "900" }}>
                          Title:
                        </Typography>
                        <Typography sx={{}}>
                          {`${cutDescription(
                            item.title
                              ? item.title
                              : (item.alert?.title as string),
                            10
                          )}`}
                        </Typography>
                        <Typography sx={{ fontWeight: "900" }}>
                          Description:
                        </Typography>
                        <Typography sx={{}}>
                          {`${cutDescription(item.description, 80)}`}
                        </Typography>
                      </Paper>
                    </ListItemButton>
                  </ListItem>
                  {/* <Divider component="li" /> */}
                </React.Fragment>
              );
            })}
        </List>
      ) : (
        <Typography variant="body1">No found...</Typography>
      )}
    </Box>
  );
};
