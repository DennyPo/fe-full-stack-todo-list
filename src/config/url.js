
export const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/graphql';
export const SERVER_API = process.env.API_URL || API;

// Routes

export const SIGNIN_PAGE = "/sign-in";
export const SIGNUP_PAGE = "/sign-up";
export const HOME_PAGE = "/";
export const USERS_PAGE = "/users";

export const FREE_PAGES = [
  SIGNIN_PAGE,
  SIGNUP_PAGE
];
