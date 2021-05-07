import { useMutation } from "@apollo/client";

// Utils

import authUtil from "../utils/authUtil";

// components

import PageLayout from "../components/PageLayout/PageLayout";
import TodoForm from "../components/TodoForm/TodoForm";

// Mutations

import { CREATE_TODO_MUTATION } from "../../operations/mutations";

export const getServerSideProps = async ctx => authUtil(ctx);

function Home(props) {

  const [createTodo, { loading }] = useMutation(CREATE_TODO_MUTATION);

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
  }

  return (
    <PageLayout>
      <TodoForm onSubmit={onSubmit} loading={loading} />
    </PageLayout>
  )
}

export default Home;
