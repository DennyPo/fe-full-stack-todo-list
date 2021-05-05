
export const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/graphql';

// Routes

export const SIGNIN_PAGE = "/sign-in";
export const SIGNUP_PAGE = "/sign-up";
export const HOME_PAGE = "/";
export const PROFILE_PAGE = "/profile";

export const FREE_PAGES = [
  SIGNIN_PAGE,
  SIGNUP_PAGE
];
