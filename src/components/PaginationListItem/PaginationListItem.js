import { useState } from "react";
import useTranslation from "next-translate/useTranslation";

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
import TodoForm from "../TodoForm/TodoForm";

const PaginationListItem = ({ id, title, description, onDelete, onEdit }) => {

  const [anchorEl, setAnchorEl] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const { t } = useTranslation('common');

  const handleClosePopover = () => setAnchorEl(null);

  const handleToggleForm = () => setIsEdit(prevState => !prevState);

  return (
    <ListItem divider>
      {isEdit ?
        <TodoForm
          id={id}
          title={title}
          description={description}
          onSubmit={values => {
            onEdit(values);
            handleToggleForm();
          }}
          onCancel={handleToggleForm}
          cancelButton
        /> :
        <>
          <ListItemText
            primary={title}
          />
          <ListItemSecondaryAction>
            <IconButton
              aria-label="edit"
              onClick={handleToggleForm}
            >
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
              <Typography>{t('deleteConfirm')}</Typography>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <Button
                    disableElevation
                    variant="contained"
                    color="secondary"
                    size="small"
                    onClick={() => onDelete(id)}
                  >
                    {t('yes')}
                  </Button>
                </Grid>
                <Grid item xs={4}>
                  <Button
                    disableElevation
                    variant="contained"
                    size="small"
                    onClick={handleClosePopover}
                  >
                    {t('no')}
                  </Button>
                </Grid>
              </Grid>
            </Popover>
          </ListItemSecondaryAction>
        </>
      }
    </ListItem>
  );
};

export default PaginationListItem;
