import { useLazyQuery, useMutation } from "@apollo/client";
import { useEffect } from "react";

// Utils

import authUtil from "../utils/authUtil";

// components

import PageLayout from "../components/PageLayout/PageLayout";
import TodoForm from "../components/TodoForm/TodoForm";
import PaginationList from "../components/PaginationList/PaginationList";

// Operations

import { CREATE_TODO_MUTATION } from "../../operations/mutations";
import { GET_CURRENT_USER_TODOS } from "../../operations/queries";

export const getServerSideProps = async ctx => authUtil(ctx);

function Home(props) {

  const [createTodo, { loading, data: createdTodo }] = useMutation(CREATE_TODO_MUTATION);
  const [getTodos, { data }] = useLazyQuery(GET_CURRENT_USER_TODOS, { fetchPolicy: "network-only" });

  useEffect(() => {
    getTodos();
  }, [createdTodo]);


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
      <PaginationList list={data?.findAllCurrentUserTodos} />
    </PageLayout>
  )
}

export default Home;
