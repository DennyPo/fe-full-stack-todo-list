import getCookies from "next-cookies";
import { initializeApollo } from "../apollo-client";
import cookie from "cookie";
import jwtDecode from "jwt-decode";

import { FREE_PAGES, HOME_PAGE, SIGNIN_PAGE } from "../config/url";
import { REFRESH_TOKEN_NAME, TOKEN_NAME } from "../config/config";
import { GET_CURRENT_USER_QUERY, GET_NEW_ACCESS_TOKEN_QUERY } from "../../operations/queries";

const authUtil = async (ctx, props = {}) => {
  const client = initializeApollo();
  const authorization = getCookies(ctx)[TOKEN_NAME];
  const refresh = getCookies(ctx)[REFRESH_TOKEN_NAME];

  const redirect = {
    redirect: {
      permanent: false,
      destination: SIGNIN_PAGE
    }
  }

  const isFreePage = FREE_PAGES.some(page => page === ctx.resolvedUrl);

  if (!authorization && !refresh && !isFreePage) return redirect;

  let token = authorization;
  try {

    if (!authorization && refresh) {
      const { data } = await client.query({
        query: GET_NEW_ACCESS_TOKEN_QUERY,
        variables: { refreshToken: refresh }
      });

      token = data.refreshToken.accessToken;
      const decodedToken = jwtDecode(token);

      ctx.res.setHeader('Set-Cookie', cookie.serialize(TOKEN_NAME, token, {
        expires: new Date(decodedToken.exp * 1000),
        path: '/'
      }));
    }

    if (token) {

      await client.query({
        query: GET_CURRENT_USER_QUERY,
        context: {
          headers: { authorization: token }
        },
      });

      if (isFreePage) {
        return {
          redirect: {
            permanent: false,
            destination: HOME_PAGE
          }
        }
      }
    }
  } catch (e) {
    console.log("ERROR", e?.networkError?.result?.errors);
    console.log("ERROR1111", e);

    ctx.res.setHeader('Set-Cookie', [
      cookie.serialize(TOKEN_NAME, '', { path: '/' }),
      cookie.serialize(REFRESH_TOKEN_NAME, '', { path: '/' })
    ]);

    return redirect;
  }

  return {
    props: {
      initialApolloState: client.cache.extract(),
    },
  };
};

export default authUtil;
