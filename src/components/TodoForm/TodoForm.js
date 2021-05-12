import { useFormik } from "formik";

// Components

import { CircularProgress, Grid } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

// Styles

import styles from "./TodoForm.module.scss";


const TodoForm = props => {

  const {
    onSubmit,
    loading,
    id,
    title,
    description,
    cancelButton,
    onCancel
  } = props;

  const {
    values,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: {
      ...(id && { id }),
      title: title || "",
      description: description || ""
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
      <Grid container spacing={8}>
        <Grid item xs={6}>
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
        </Grid>
        {cancelButton &&
          <Grid item xs={6}>
            <Button
              variant="contained"
              onClick={onCancel}
              classes={{ root: styles.button }}
            >
              Cancel
            </Button>
          </Grid>
        }
      </Grid>
    </form>
  );
};

export default TodoForm;
