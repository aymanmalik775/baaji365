import React from 'react';
import Appbar from './Appbar';

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <>
      <Appbar />
      <main>{children}</main>
    </>
  );
}
