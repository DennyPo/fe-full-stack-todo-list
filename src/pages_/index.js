import { useLazyQuery, useMutation } from "@apollo/client";
import { useEffect } from "react";
import { useRouter } from "next/router";

// Utils

import authUtil from "../utils/authUtil";

// components

import PageLayout from "../components/PageLayout/PageLayout";
import TodoForm from "../components/TodoForm/TodoForm";
import PaginationList from "../components/PaginationList/PaginationList";

// Operations

import { CREATE_TODO_MUTATION, DELETE_TODO_MUTATION, UPDATE_TODO_MUTATION } from "../../operations/mutations";
import { GET_CURRENT_USER_TODOS_QUERY } from "../../operations/queries";

export const getServerSideProps = async ctx => authUtil(ctx);

function Home(props) {

  const router = useRouter();

  const [getTodos, { data }] = useLazyQuery(GET_CURRENT_USER_TODOS_QUERY, { fetchPolicy: "network-only" });

  const [createTodo, { loading }] = useMutation(CREATE_TODO_MUTATION, {
    update: () => {
      getTodos({
        variables: {
          pagination: {
            take: parseInt(router.query.perPage, 10)
          }
        }
      });

      const path = `${router.pathname}?page=1&perPage=${router.query.perPage}`;

      router.push(path, path, { shallow: true });
    }
  });

  const [deleteTodo] = useMutation(DELETE_TODO_MUTATION);
  const [updateTodo] = useMutation(UPDATE_TODO_MUTATION);

  useEffect(() => {
      getTodos();
  }, []);


  const onSubmit = async (values, { setValues }) => {

    const { data } = await createTodo({
      variables: { createTodoInput: values }
    });

    if (data) {
      setValues({
        title: "",
        description: ""
      });
    }
  };

  return (
    <PageLayout>
      <TodoForm onSubmit={onSubmit} loading={loading} />
      <PaginationList
        data={data?.findAllCurrentUserTodos}
        onRequest={getTodos}
        onDelete={deleteTodo}
        onEdit={updateTodo}
      />
    </PageLayout>
  )
}

export default Home;
