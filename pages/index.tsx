import type { NextPage } from 'next';
import Head from 'next/head';
import { Container } from '@chakra-ui/react';
import { usePrefetchUsers } from '../hooks/query/useGetUsers';
import { useEffect } from 'react';
import Marketing from '../components/Section/Marketing';
import UserCard from '../components/Section/UserCard';

export const primaryColor = '#2F855A';

const Home: NextPage = () => {
  const prefetch = usePrefetchUsers();

  useEffect(() => {
    prefetch();
  }, [prefetch]);

  return (
    <>
      <Head>
        <title>Baaji365 Official Bangladesh</title>
        <meta name="baaji365" content="baaji365_winpku_winpbu_velki" />
      </Head>

        <Marketing />
        <UserCard />
    </>
  );
};

export default Home;
