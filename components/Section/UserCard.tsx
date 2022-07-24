import {
  Box,
  Stack,
  Heading,
  Text,
  VStack,
  useColorModeValue,
  Button,
  Avatar,
  AvatarBadge
} from '@chakra-ui/react';
import Link from 'next/link';
import { ReactNode } from 'react';

function PriceWrapper({ children }: { children: ReactNode }) {
  return (
    <Box
      mb={4}
      shadow="base"
      borderWidth="1px"
      alignSelf={{ base: 'center', lg: 'flex-start' }}
      borderColor={useColorModeValue('gray.200', 'gray.500')}
      borderRadius={'xl'}
    >
      {children}
    </Box>
  );
}

const UserCard = () => {
  return (
    <Box backgroundColor={'red.200'} py={12} height={'xl'}>
      <VStack spacing={2} textAlign="center">
        <Heading as="h1" fontSize="4xl">
          List of our admin, agent and super agent.
        </Heading>
        <Text fontSize="lg" color={'gray.500'}>
          Feel free to message them whenever you need any help or if you have
          any queries or any complain.
        </Text>
      </VStack>
      <Stack
        direction={{ base: 'column', md: 'row' }}
        textAlign="center"
        justify="center"
        spacing={{ base: 4, lg: 10 }}
        py={10}
      >
        <PriceWrapper>
          <Box py={4} px={12}>
            <Text fontWeight="500" fontSize="2xl">
              Agent
            </Text>
          </Box>
          <VStack
            bg={useColorModeValue('gray.50', 'gray.700')}
            py={4}
            borderBottomRadius={'xl'}
          >
            <Avatar
              size={'xl'}
              name="Dan Abrahmov"
              src="https://bit.ly/dan-abramov"
            >
              <AvatarBadge boxSize="1.25em" bg="green.500" />
            </Avatar>
            <Text px={2}>To see out agent list click the button below.</Text>
            <Box w="80%" pt={7}>
              <Link href="/agent-list">
                <Button w="full" colorScheme="red" variant="outline">
                  Agent List
                </Button>
              </Link>
            </Box>
          </VStack>
        </PriceWrapper>

        <PriceWrapper>
          <Box position="relative">
            <Box
              position="absolute"
              top="-16px"
              left="50%"
              style={{ transform: 'translate(-50%)' }}
            >
              <Text
                textTransform="uppercase"
                bg={useColorModeValue('red.300', 'red.700')}
                px={3}
                py={1}
                color={useColorModeValue('gray.900', 'gray.300')}
                fontSize="sm"
                fontWeight="600"
                rounded="xl"
              >
                Most Active
              </Text>
            </Box>
            <Box py={4} px={12}>
              <Text fontWeight="500" fontSize="2xl">
                Admin
              </Text>
            </Box>
            <VStack
              bg={useColorModeValue('gray.50', 'gray.700')}
              py={4}
              borderBottomRadius={'xl'}
            >
              <Avatar
                size={'xl'}
                name="Christian Nwamba"
                src="https://bit.ly/code-beast"
              >
                <AvatarBadge boxSize="1.25em" bg="green.500" />
              </Avatar>
              <Text px={2}>To see out admin list click the button below.</Text>
              <Box w="80%" pt={7}>
                <Link href="/admin-list">
                  <Button w="full" colorScheme="red" variant="outline">
                    Admin List
                  </Button>
                </Link>
              </Box>
            </VStack>
          </Box>
        </PriceWrapper>
        <PriceWrapper>
          <Box py={4} px={12}>
            <Text fontWeight="500" fontSize="2xl">
              Super Agent
            </Text>
          </Box>
          <VStack
            bg={useColorModeValue('gray.50', 'gray.700')}
            py={4}
            borderBottomRadius={'xl'}
          >
            <Avatar
              size={'xl'}
              name="Kent Dodds"
              src="https://bit.ly/kent-c-dodds"
            >
              <AvatarBadge boxSize="1.25em" bg="green.500" />
            </Avatar>
            <Text px={2}>To see out agent list click the button below.</Text>
            <Box w="80%" pt={7}>
              <Link href="/super-agent-list">
                <Button w="full" colorScheme="red" variant="outline">
                  Super Agent List
                </Button>
              </Link>
            </Box>
          </VStack>
        </PriceWrapper>
      </Stack>
    </Box>
  );
};

export default UserCard;
