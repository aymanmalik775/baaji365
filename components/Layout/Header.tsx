import React from 'react';
import {
  Box,
  Flex,
  Text,
  Button,
  Center,
  Avatar,
  IconButton,
  Tooltip
} from '@chakra-ui/react';
import Link from 'next/link';
import Image from 'next/image';
import { signIn, useSession, signOut } from 'next-auth/react';
import { FaGoogle, FaSignOutAlt } from 'react-icons/fa';

interface NavItem {
  label: string;
  href?: string;
}

const NAV_ITEMS: Array<NavItem> = [
  {
    label: 'Admin List',
    href: '/admin-list'
  },
  {
    label: 'Super Agent List',
    href: '/super-agent-list'
  },
  {
    label: 'Agent List',
    href: '/agent-list'
  }
];

type MenuItemsProps = {
  navItems: NavItem[];
};

const MenuItems = ({ navItems }: MenuItemsProps) => {
  const renderedContent = navItems.map(navItem => (
    <Link href={`${navItem.href}`} key={navItem.href}>
      <a>
        <Text mt={{ base: 4, md: 0 }} mr={6} display="block">
          {navItem.label}
        </Text>
      </a>
    </Link>
  ));

  return <>{renderedContent}</>;
};

const Header = () => {
  const [show, setShow] = React.useState(false);
  const { data: session } = useSession();
  const handleToggle = () => setShow(!show);

  return (
    <>
      <Flex
        as="nav"
        align="center"
        justify="space-between"
        wrap="wrap"
        padding="1.5rem"
        bg="teal.500"
        color="white"
      >
        <Flex align="center" mr={5}>
          <Link href="/">
            <Image
              style={{ cursor: 'pointer' }}
              src="/logo.png"
              alt="baaji365-logo"
              width={120}
              height={40}
            />
          </Link>
        </Flex>

        <Box display={{ base: 'block', md: 'none' }} onClick={handleToggle}>
          <svg
            fill="white"
            width="12px"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </Box>

        <Box
          display={{ base: show ? 'block' : 'none', md: 'flex' }}
          width={{ base: 'full', md: 'auto' }}
          alignItems="center"
          flexGrow={1}
        >
          <MenuItems navItems={NAV_ITEMS} />
        </Box>

        <Box
          display={{ base: show ? 'block' : 'none', md: 'block' }}
          mt={{ base: 4, md: 0 }}
        >
          {session?.user ? (
            <Box display={'flex'}>
              <Center>
                <Avatar
                  name={session.user.name ?? ''}
                  src={session.user.image ?? ''}
                  marginRight={2}
                  size="sm"
                />
                <Text textTransform={'uppercase'} fontWeight={'bold'}>
                  Hi, {session.user.name}
                </Text>
                <Tooltip label="Sign Out">
                  <IconButton
                    size={'sm'}
                    onClick={() => signOut()}
                    mx={2}
                    colorScheme="red"
                    aria-label="Search database"
                    icon={<FaSignOutAlt />}
                  />
                </Tooltip>
              </Center>
            </Box>
          ) : (
            <Button
              onClick={() => signIn('google')}
              variant={'solid'}
              colorScheme="whiteAlpha"
              leftIcon={<FaGoogle />}
            >
              <Center>
                <Text>Sign in with Google</Text>
              </Center>
            </Button>
          )}
        </Box>
      </Flex>
    </>
  );
};

export default Header;
