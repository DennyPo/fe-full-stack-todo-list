import getCookies from "next-cookies";
import _ from "lodash";

import { FREE_PAGES, HOME_PAGE, SIGNIN_PAGE } from "../config/url";
import wrapper from "../store";
import actionHelper from "./actionHelper";
import { LOGIN } from "../store/actions/authActions";
import { TOKEN_NAME } from "../config/config";
import { gql } from "@apollo/client/core";
import client from "../apollo-client";

const authUtil = wrapper.getServerSideProps(async (ctx, props = {}) => {
  const authorization = getCookies(ctx)[TOKEN_NAME];

  const redirect = {
    redirect: {
      permanent: false,
      destination: SIGNIN_PAGE
    }
  }

  const isFreePage = FREE_PAGES.some(page => page === ctx.resolvedUrl);

  if (!authorization && !isFreePage) return redirect;

  if (_.isEmpty(ctx.store.getState().user.currentUser) && authorization) {

    try {

      const { data } = await client.query({
        query: gql`
            query currentUser {
                currentUser {
                    id,
                    email
                }
            }
        `,
        context: {
          headers: {
            Authorization: `Bearer ${authorization}`
          }
        },
      });

      ctx.store.dispatch({ type: actionHelper(LOGIN, true), payload: data.currentUser });

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
});

export default authUtil;
