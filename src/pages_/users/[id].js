import { useLazyQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useEffect } from "react";

// Styles

import styles from "../../styles/Users.module.scss";


import authUtil from "../../utils/authUtil";

// components

import PageLayout from "../../components/PageLayout/PageLayout";
import PaginationList from "../../components/PaginationList/PaginationList";

// Operations

import { GET_USER_TODOS_QUERY } from "../../../operations/queries";

// Pages

import { HOME_PAGE } from "../../config/url";

export const getServerSideProps = async ctx => authUtil(ctx);

function Users(props) {

  const router = useRouter();

  const [getUserTodos, { data, error }] = useLazyQuery(GET_USER_TODOS_QUERY, {
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
        <PaginationList
          data={data?.findAllTodosByUserId}
          onRequest={getUserTodos}
          withoutActions
        />
      </div>
    </PageLayout>
  )
}

export default Users;
