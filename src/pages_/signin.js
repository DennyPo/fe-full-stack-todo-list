import { useFormik } from "formik";
import { useEffect } from "react";
import Router  from "next/router";
import { useLazyQuery } from "@apollo/client";

// components

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { CircularProgress } from "@material-ui/core";

// styles

import styles from "../styles/Signin.module.scss";

// validationSchema

import { validate } from "../validation/signin"

// utils

import authUtil from "../utils/authUtil";
import { setCookie } from "../utils/cookiesUtils";

// config

import { HOME_PAGE } from "../config/url";
import { REFRESH_TOKEN_NAME, TOKEN_NAME } from "../config/config";

// Queries

import { LOG_IN_QUERY } from "../../operations/queries";

export const getServerSideProps = async ctx => authUtil(ctx);


function Signin(props) {

  const [signIn, { loading, error }] = useLazyQuery(LOG_IN_QUERY, {
    onCompleted: ({ login }) => {
      setCookie(TOKEN_NAME, login.accessToken);
      setCookie(REFRESH_TOKEN_NAME, login.refreshToken);

      Router.push(HOME_PAGE);
    },
  });

  const submitHandler = values => {

    signIn({
      variables: { loginUserInput: values },
    });
  }

  const {
    values,
    errors,
    handleSubmit,
    handleChange,
    setErrors
  } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate,
    onSubmit: submitHandler,
    validateOnChange: false
  });

  useEffect(() => {
    if (error) {
      setErrors({
        email: error.message,
        password: error.message
      })
    }
  }, [error]);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={styles.paper}>
        <Avatar className={styles.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={styles.form} onSubmit={handleSubmit}>
          <TextField
              value={values.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
              variant="outlined"
              margin="normal"
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
          />
          <TextField
              value={values.password}
              onChange={handleChange}
              error={!!errors.password}
              helperText={errors.password}
              variant="outlined"
              margin="normal"
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
          />
          {/*<FormControlLabel*/}
          {/*    control={*/}
          {/*      <Checkbox*/}
          {/*          checked={values.remember}*/}
          {/*          onChange={handleChange}*/}
          {/*          name="remember"*/}
          {/*          color="primary"*/}
          {/*      />*/}
          {/*    }*/}
          {/*    label="Remember me"*/}
          {/*/>*/}
          <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={styles.submit}
              startIcon={loading && <CircularProgress color="secondary" size={20} />}
          >
            Sign In
          </Button>
        </form>
      </div>
    </Container>
  );
}

export default Signin;
