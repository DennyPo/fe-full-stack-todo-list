import Head from 'next/head';
import authUtil from "../utils/authUtil";

export const getServerSideProps = async ctx => authUtil(ctx);

function Home() {

  return (
    <div >
      <Head>
        <title>Create Next App</title>
      </Head>

      <div>
        Hello User
      </div>

    </div>
  )
}

export default (Home);
