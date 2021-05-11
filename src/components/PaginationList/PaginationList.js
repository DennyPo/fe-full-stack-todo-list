import { IconButton, List, ListItem, ListItemSecondaryAction, ListItemText, MenuItem, Select } from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Pagination from '@material-ui/lab/Pagination';
import { useRouter } from "next/router";


const PaginationList = props => {

  const {
    data: {
      list = [],
      count = 0
    } = {},
    request
  } = props;

  const router = useRouter();

  const perPage = parseInt(router.query.perPage, 10) || 10;
  const page = parseInt(router.query.page, 10) || 1;

  const pageCount = Math.ceil(count / perPage);

  const onPageChange = (e, page) => {

    request({
      variables: {
        pagination: {
          take: perPage,
          page
        }
      }
    });

    const path = `${router.pathname}?page=${page}&perPage=${perPage}`;

    router.push(path, path, { shallow: true });
  }

  const onPerPageChange = e => {

    const perPage = parseInt(e.target.value, 10);

    request({
      variables: {
        pagination: {
          take: perPage
        }
      }
    });

    const path = `${router.pathname}?page=1&perPage=${perPage}`;

    router.push(path, path, { shallow: true });
  }

  return (
    <>
      <List>
        {list.map(({ id, title, description }) => (
          <ListItem key={id} divider>
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
      <Pagination
        count={pageCount}
        page={page}
        onChange={onPageChange}
      />
      <Select
        defaultValue={10}
        onChange={onPerPageChange}
      >
        <MenuItem value="10">10</MenuItem>
        <MenuItem value="20">20</MenuItem>
        <MenuItem value="50">50</MenuItem>
      </Select>
    </>
  );
};

export default PaginationList;
