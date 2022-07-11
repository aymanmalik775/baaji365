import { Box, Flex, Text, useColorModeValue } from '@chakra-ui/react';

const Footer = () => {
  return (
    <Box marginTop={'auto'} py={6}>
      <Flex
        align={'center'}
        _before={{
          content: '""',
          borderBottom: '1px solid',
          borderColor: useColorModeValue('gray.200', 'gray.700'),
          flexGrow: 1,
          mr: 8
        }}
        _after={{
          content: '""',
          borderBottom: '1px solid',
          borderColor: useColorModeValue('gray.200', 'gray.700'),
          flexGrow: 1,
          ml: 8
        }}
      >
        BAAJI365
      </Flex>
      <Text pt={2} fontSize={'sm'} textAlign={'center'}>
        © {new Date().getFullYear()} Baaji365. All rights reserved
      </Text>
    </Box>
  );
};

export default Footer;
