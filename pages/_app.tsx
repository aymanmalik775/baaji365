import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ChakraProvider, ToastProvider } from '@chakra-ui/react';
import Layout from '../components/Layout';
import { useEffect, useState } from 'react';
import { QueryClientProvider } from 'react-query';
import queryClient from '../react-query/queryClient';

function MyApp({ Component, pageProps }: AppProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        <ToastProvider defaultOptions={{ duration: 3000, isClosable: true }}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ToastProvider>
      </QueryClientProvider>
    </ChakraProvider>
  );
}

export default MyApp;
