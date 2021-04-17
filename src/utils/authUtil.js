import getCookies from "next-cookies";
import client from "../apollo-client";


import { FREE_PAGES, HOME_PAGE, SIGNIN_PAGE } from "../config/url";
import { TOKEN_NAME } from "../config/config";
import { GET_CURRENT_USER_QUERY } from "../../operations/queries";

const authUtil = async (ctx, props = {}) => {
  const authorization = getCookies(ctx)[TOKEN_NAME];

  const redirect = {
    redirect: {
      permanent: false,
      destination: SIGNIN_PAGE
    }
  }

  const isFreePage = FREE_PAGES.some(page => page === ctx.resolvedUrl);

  if (!authorization && !isFreePage) return redirect;

  if (authorization) {
    try {

      const { data } = await client.query({
        query: GET_CURRENT_USER_QUERY,
        context: {
          headers: { authorization }
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
    } catch (e) {
      ctx.res.setHeader('Set-Cookie', [`${TOKEN_NAME}=`]);

      return redirect;
    }
  }

  return { props };
};

export default authUtil;
