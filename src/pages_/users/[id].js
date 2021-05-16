import { useLazyQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useEffect } from "react";
import useTranslation from "next-translate/useTranslation";

// Styles

import styles from "../../styles/Users.module.scss";


import authUtil from "../../utils/authUtil";

// components

import PageLayout from "../../components/PageLayout/PageLayout";
import PaginationList from "../../components/PaginationList/PaginationList";
import Typography from "@material-ui/core/Typography";

// Operations

import { GET_USER_TODOS_QUERY } from "../../../operations/queries";

// Pages

import { HOME_PAGE } from "../../config/url";

export const getServerSideProps = async ctx => authUtil(ctx);

function Users(props) {

  const router = useRouter();
  const { t } = useTranslation('common');

  const [getUserTodos, { data, error, loading }] = useLazyQuery(GET_USER_TODOS_QUERY, {
    fetchPolicy: "network-only",
    variables: {
      userId: parseInt(router.query.id, 10)
    }
  });

  useEffect(() => {
    getUserTodos();
  }, []);

  useEffect(() => {
    if (error) {
      router.push(HOME_PAGE);
    }
  }, [error]);

  return (
    <PageLayout>
      <div className={styles.wrapper}>
        <Typography component="h1" variant="h4">
          {`${t('someUserTodos')} ${router.query.userName || ""}`}
        </Typography>
        <PaginationList
          data={data?.findAllTodosByUserId}
          onRequest={getUserTodos}
          loading={loading}
          withoutActions
        />
      </div>
    </PageLayout>
  )
}

export default Users;
