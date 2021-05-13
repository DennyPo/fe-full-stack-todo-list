import { useFormik } from "formik";
import { useEffect } from "react";
import Router  from "next/router";
import { useMutation } from "@apollo/client";
import Link from "next/link";
import useTranslation from "next-translate/useTranslation";

// components

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { CircularProgress } from "@material-ui/core";

// styles

import styles from "../styles/Signin.module.scss";

// validationSchema

import { validate } from "../validation/signup";

// utils

import authUtil from "../utils/authUtil";

// config

import { SIGNIN_PAGE } from "../config/url";

// Mutations

import { SIGN_UP_MUTATION } from "../../operations/mutations";

export const getServerSideProps = async ctx => authUtil(ctx);


function SignUp(props) {

  const [signUp, { loading, error, data }] = useMutation(SIGN_UP_MUTATION, { errorPolicy: "all" });

  const { t } = useTranslation('common');

  const submitHandler = values => {

    signUp({
      variables: { signUpUserInput: values },
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
      name: ""
    },
    validate,
    onSubmit: submitHandler,
    validateOnChange: false
  });

  useEffect(() => {
    if (data) {

      Router.push(SIGNIN_PAGE);
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      setErrors({
        email: error.message
      });
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
          {t('signupHeading')}
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
            label={t('email')}
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            value={values.name}
            onChange={handleChange}
            error={!!errors.name}
            helperText={errors.name}
            variant="outlined"
            margin="normal"
            fullWidth
            id="name"
            label={t('name')}
            name="name"
            autoComplete="name"
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
            label={t('password')}
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={styles.submit}
            startIcon={loading && <CircularProgress color="secondary" size={20} />}
          >
            {t('signupHeading')}
          </Button>
        </form>
        <Typography className={styles.register} component="p" variant="subtitle1">
          {t('haveAccount')} <Link href="/sign-in"><a>{t('signin')}</a></Link>.
        </Typography>
      </div>
    </Container>
  );
}

export default SignUp;
