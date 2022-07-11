import { Box } from '@chakra-ui/react';
import React from 'react';
import Footer from './Footer';
import Header from './Header';

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <Box height={'100vh'} display="flex" flexDirection={'column'}>
      <Header />
      <main>{children}</main>
      <Footer />
    </Box>
  );
}
