import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ChakraProvider, ToastProvider } from '@chakra-ui/react';
import Layout from '../components/Layout';
import { useEffect, useState } from 'react';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import queryClient from '../react-query/queryClient';
import { SessionProvider } from 'next-auth/react';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <SessionProvider session={session}>
      <ChakraProvider>
        <QueryClientProvider client={queryClient}>
          <ToastProvider defaultOptions={{ duration: 3000, isClosable: true }}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ToastProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </ChakraProvider>
    </SessionProvider>
  );
}

export default MyApp;
