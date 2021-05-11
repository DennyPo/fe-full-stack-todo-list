import { useState } from "react";

import styles from "./PaginationListItem.module.scss";

// Components

import {
  IconButton,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Popover,
  Typography,
  Button, Grid
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

const PaginationListItem = ({ id, title, onDelete }) => {

  const [anchorEl, setAnchorEl] = useState(false);

  const handleClosePopover = () => setAnchorEl(null);

  return (
    <ListItem divider>
      <ListItemText
        primary={title}
      />
      <ListItemSecondaryAction>
        <IconButton aria-label="edit">
          <EditIcon />
        </IconButton>
        <IconButton
          aria-label="delete"
          onClick={e => setAnchorEl(e.currentTarget)}
        >
          <DeleteIcon />
        </IconButton>
        <Popover
          open={!!anchorEl}
          anchorEl={anchorEl}
          onClose={handleClosePopover}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          classes={{ paper: styles.popover }}
        >
          <Typography>Are you sure want to delete todo?</Typography>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Button
                disableElevation
                variant="contained"
                color="secondary"
                size="small"
                onClick={() => onDelete(id)}
              >
                Yes
              </Button>
            </Grid>
            <Grid item xs={4}>
              <Button
                disableElevation
                variant="contained"
                size="small"
                onClick={handleClosePopover}
              >
                No
              </Button>
            </Grid>
          </Grid>
        </Popover>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default PaginationListItem;
