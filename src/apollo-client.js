import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { API } from "./config/url";


const httpLink = createHttpLink({
  uri: API,
});

const authLink = setContext((_, { headers }) => {

  return {
    headers: {
      ...headers,
      // authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

export default client;
