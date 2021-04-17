import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { API } from "./config/url";
import cookies from "js-cookie";
import { TOKEN_NAME } from "./config/config";


const httpLink = createHttpLink({
  uri: API,
});

const authLink = setContext((_, { headers }) => {

  let authorization;
  if (process.browser) {
    authorization = cookies.get(TOKEN_NAME);
  } else {
    authorization = headers?.authorization
  }

  return {
    headers: {
      ...headers,
      ...(authorization && { authorization: `Bearer ${authorization}` })
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

export default client;
