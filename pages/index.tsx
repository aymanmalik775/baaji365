import type { NextPage } from 'next';
import Head from 'next/head';

export const primaryColor = '#2F855A';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Baaji365 BD Information</title>
        <meta name="baaji365" content="baaji365_winpku_winpbu_velki" />
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>
      <p>Home page</p>
    </>
  );
};

export default Home;
