import { useRouter } from "next/router";

// Components

import {
  Grid,
  List,
  MenuItem,
  Select
} from "@material-ui/core";
import Pagination from '@material-ui/lab/Pagination';
import PaginationListItem from "../PaginationListItem/PaginationListItem";


const PaginationList = props => {

  const {
    data: {
      list = [],
      count = 0
    } = {},
    titleKey = "title",
    descriptionKey = "description",
    onRequest,
    onDelete,
    onEdit,
    onClick,
    withoutActions
  } = props;

  const router = useRouter();

  const perPage = parseInt(router.query.perPage, 10) || 10;
  const page = parseInt(router.query.page, 10) || 1;

  const pageCount = Math.ceil(count / perPage);

  const onPageChange = (e, page) => {

    onRequest({
      variables: {
        pagination: {
          take: perPage,
          page
        }
      }
    });

    const path = {
      pathname: router.pathname,
      query: { ...router.query, page, perPage }
    }

    router.push(path, path, { shallow: true });
  };

  const onPerPageChange = e => {

    const perPage = parseInt(e.target.value, 10);

    onRequest({
      variables: {
        pagination: {
          take: perPage
        }
      }
    });

    const path = {
      pathname: router.pathname,
      query: { ...router.query, page, perPage }
    }

    router.push(path, path, { shallow: true });
  };

  const onDeleteItem = id => onDelete({
    variables: { id },
    update: () => {
      const isLastItemOnLastPage = count % perPage === 1 && page === pageCount;

      onRequest({
        variables: {
          pagination: {
            take: perPage,
            page: isLastItemOnLastPage ? page - 1 : page
          }
        }
      });

      if (isLastItemOnLastPage) {
        const path = {
          pathname: router.pathname,
          query: { ...router.query, page: page - 1, perPage }
        }

        router.push(path, path, { shallow: true });
      }
    }
  });

  const onEditItem = item => onEdit({
    variables: {
      updateTodoInput: item
    }
  });

  return (
    <>
      <List>
        {list.map(item => (
          <PaginationListItem
            key={item.id}
            data={item}
            onDelete={onDeleteItem}
            onEdit={onEditItem}
            onClick={onClick}
            withoutActions={withoutActions}
            titleKey={titleKey}
            descriptionKey={descriptionKey}
          />
        ))}
      </List>
      <Grid container spacing={3}>
        <Grid item xs={10}>
          <Pagination
            count={pageCount}
            page={page}
            onChange={onPageChange}
          />
        </Grid>
        <Grid item xs={2}>
          <Select
            defaultValue={10}
            onChange={onPerPageChange}
          >
            <MenuItem value="10">10</MenuItem>
            <MenuItem value="20">20</MenuItem>
            <MenuItem value="50">50</MenuItem>
          </Select>
        </Grid>
      </Grid>
    </>
  );
};

export default PaginationList;
