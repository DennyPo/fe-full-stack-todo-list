import { IconButton, List, ListItem, ListItemSecondaryAction, ListItemText } from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';


const PaginationList = ({ list = [] }) => {
  return (
    <List>
      {list.map(({ id, title, description }) => (
        <ListItem key={id}>
          <ListItemText
            primary={title}
          />
          <ListItemSecondaryAction>
            <IconButton aria-label="edit">
              <EditIcon />
            </IconButton>
            <IconButton aria-label="delete">
              <DeleteIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>
  );
};

export default PaginationList;
