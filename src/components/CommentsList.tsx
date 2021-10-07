import * as React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import InboxIcon from "@mui/icons-material/Inbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import { cutDescription } from "../helpers/cutDescription";
import { useHistory } from "react-router";
import { Typography } from "@material-ui/core";

export interface ICommentsListProps {
  list: IItem[];
}
export interface IItem {
  _id: string;
  title: string;
  description: string;
  alertId?: string;
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
              return (
                <>
                  <ListItem
                    disablePadding
                    key={item._id}
                    onClick={() => {
                      const alertId = item.alertId ? item.alertId : item._id;
                      history.push(`alert/${alertId}`);
                    }}
                  >
                    <ListItemButton>
                      <ListItemText
                        primary={`Title: ${
                          item.title
                        } | Description: ${cutDescription(
                          item.description,
                          10
                        )}`}
                      />
                    </ListItemButton>
                  </ListItem>
                  <Divider component="li" />
                </>
              );
            })}
        </List>
      ) : (
        <Typography variant="body1">No found...</Typography>
      )}
    </Box>
  );
};
