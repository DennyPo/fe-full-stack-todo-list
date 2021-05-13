import { useLazyQuery } from "@apollo/client";
import { useEffect } from "react";

// Styles

import styles from "../styles/Users.module.scss";


import authUtil from "../utils/authUtil";

// components

import PageLayout from "../components/PageLayout/PageLayout";
import PaginationList from "../components/PaginationList/PaginationList";

// Operations

import { GET_USERS_QUERY } from "../../operations/queries";

export const getServerSideProps = async ctx => authUtil(ctx);

function Users(props) {

  const [getUsers, { data }] = useLazyQuery(GET_USERS_QUERY, { fetchPolicy: "network-only" });

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <PageLayout>
      <div className={styles.wrapper}>
        <PaginationList
          data={data?.users}
          onRequest={getUsers}
          titleKey="name"
          withoutActions
        />
      </div>
    </PageLayout>
  )
}

export default Users;
