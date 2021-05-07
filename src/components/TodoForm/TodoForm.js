import { useFormik } from "formik";

// Components

import { CircularProgress } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

// Styles

import styles from "./TodoForm.module.scss";


const TodoForm = ({ onSubmit, loading }) => {

  const {
    values,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: {
      title: "",
      description: ""
    },
    onSubmit
  });

  return (
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
  );
};

export default TodoForm;
