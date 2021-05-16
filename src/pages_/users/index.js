import { useLazyQuery } from "@apollo/client";
import { useEffect } from "react";
import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";

// Styles

import styles from "../../styles/Users.module.scss";


import authUtil from "../../utils/authUtil";

// components

import PageLayout from "../../components/PageLayout/PageLayout";
import PaginationList from "../../components/PaginationList/PaginationList";
import Typography from "@material-ui/core/Typography";

// Operations

import { GET_USERS_QUERY } from "../../../operations/queries";

export const getServerSideProps = async ctx => authUtil(ctx);

function Users(props) {

  const router = useRouter();
  const { t } = useTranslation('common');

  const [getUsers, { data, loading }] = useLazyQuery(GET_USERS_QUERY, { fetchPolicy: "network-only" });

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <PageLayout>
      <div className={styles.wrapper}>
        <Typography component="h1" variant="h4">
          {t('allUsers')}
        </Typography>
        <PaginationList
          data={data?.users}
          onRequest={getUsers}
          onClick={({ id, name }) => {

            router.push({
              pathname: `/users/${id}`,
              query: { userName: name }
            });
          }}
          titleKey="name"
          loading={loading}
          withoutActions
        />
      </div>
    </PageLayout>
  )
}

export default Users;
