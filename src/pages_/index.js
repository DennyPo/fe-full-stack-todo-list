import { useFormik } from "formik";
import { useMutation } from "@apollo/client";
import { useEffect } from "react";

// Styles

import styles from "../styles/Home.module.scss";

// Utils

import authUtil from "../utils/authUtil";

// components

import PageLayout from "../components/PageLayout/PageLayout";
import TextField from "@material-ui/core/TextField";
import { CircularProgress } from "@material-ui/core";
import Button from "@material-ui/core/Button";

// Mutations

import { CREATE_TODO_MUTATION } from "../../operations/mutations";

export const getServerSideProps = async ctx => authUtil(ctx);

function Home(props) {

  const [createTodo, { loading, data }] = useMutation(CREATE_TODO_MUTATION);

  const onSubmit = values => {

    createTodo({
      variables: { createTodoInput: values },
    });
  }

  const {
    values,
    handleChange,
    handleSubmit,
    setValues
  } = useFormik({
    initialValues: {
      title: "",
      description: ""
    },
    onSubmit
  });

  useEffect(() => {
    if (data) {
      setValues({
        title: "",
        description: ""
      });
    }
  }, [data]);

  return (
    <PageLayout>
      <form onSubmit={handleSubmit}>
        <TextField
          value={values.title}
          onChange={handleChange}
          margin="normal"
          fullWidth
          id="title"
          label="Title"
          name="title"
        />
        <TextField
          value={values.description}
          onChange={handleChange}
          margin="normal"
          fullWidth
          id="description"
          label="Description"
          name="description"
          multiline
          rows={5}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          classes={{ root: styles.button }}
          startIcon={loading && <CircularProgress color="secondary" size={20} />}
          disabled={!values.title || !values.description}
        >
          Save
        </Button>
      </form>
    </PageLayout>
  )
}

export default Home;
