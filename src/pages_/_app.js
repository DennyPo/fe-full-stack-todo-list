import Head from "next/head";
import { ApolloProvider } from "@apollo/client";
import client from "../apollo-client";

import '../styles/globals.css'

function App({ Component, pageProps }) {
  return (
    <>

      <Head>
        <title>Next Starter</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width"/>
          <link rel="icon" href="/favicon.ico" />
      </Head>

      <ApolloProvider client={client}>
        <Component {...pageProps} />
      </ApolloProvider>
    </>
  )
}

export default App;
