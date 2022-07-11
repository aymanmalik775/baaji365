import {
  Heading,
  Avatar,
  Box,
  Center,
  Image,
  Flex,
  Text,
  Stack,
  Button,
  useColorModeValue,
  Input,
  Modal,
  ModalContent
} from '@chakra-ui/react';
import { useState } from 'react';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (password: string) => void;
};

export default function LockScreen({ isOpen, onClose, onSubmit }: Props) {
  const [password, setPassword] = useState('');
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <Box
          height="100%"
          width="100%"
          bg={useColorModeValue('white', 'gray.800')}
          rounded={'md'}
          overflow={'hidden'}
        >
          <Image
            h={'120px'}
            w={'full'}
            src={
              'https://images.unsplash.com/photo-1612865547334-09cb8cb455da?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'
            }
            objectFit={'cover'}
            alt="avatar"
          />
          <Flex justify={'center'} mt={-12}>
            <Avatar
              size={'xl'}
              src={
                'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ'
              }
              css={{
                border: '2px solid white'
              }}
            />
          </Flex>

          <Box p={6}>
            <Stack spacing={0} align={'center'} mb={5}>
              <Heading fontSize={'2xl'} fontWeight={500} fontFamily={'body'}>
                Super Power Mode
              </Heading>
              <Text color={'gray.500'}>Enter Password To Unlock</Text>
            </Stack>

            <form
              onSubmit={e => {
                onSubmit(password);
                e.preventDefault();
              }}
            >
              <Input onChange={e => setPassword(e.target.value)} />
              <Button
                type="submit"
                w={'full'}
                mt={8}
                bg={useColorModeValue('#151f21', 'gray.900')}
                color={'white'}
                rounded={'md'}
                _hover={{
                  transform: 'translateY(-2px)',
                  boxShadow: 'lg'
                }}
              >
                Submit
              </Button>
            </form>
          </Box>
        </Box>
      </ModalContent>
    </Modal>
  );
}
