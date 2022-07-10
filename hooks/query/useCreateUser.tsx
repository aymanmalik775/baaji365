import { useToast } from '@chakra-ui/react';
import axios from 'axios';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { User } from '../../components/UI/DataTableComponent';
import { CollectionName } from '../../DB/models/collectionName';
import { userAxios } from './useGetUsers';

const createUser = async (user: User) => {
  const { data } = await userAxios.post('/create-user', user);
  return data.data as User;
};

const useGetUsers = () => {
  const toast = useToast();
  const queryClient = useQueryClient();
  const mutation = useMutation(createUser, {
    onSuccess: user => {
      toast({
        status: 'success',
        position: 'top-right',
        title: `${user.role} "${user.username}" created successfully.`
      });
      queryClient.invalidateQueries(CollectionName.USER);
    }
  });
  return {
    ...mutation,
    createUser: mutation.mutate,
    isCreatingUser: mutation.isLoading
  };
};

export default useGetUsers;
