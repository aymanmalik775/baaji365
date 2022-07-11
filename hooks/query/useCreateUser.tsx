import { useToast } from '@chakra-ui/react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { User } from '../../components/UI/UserTable';
import { CollectionName } from '../../DB/models/collectionName';
import { userAxios } from '../../utils/userAxios';

const createUser = async (user: User) => {
  const { data } = await userAxios.post('/', user);
  return data.data as User;
};

const useCreateUser = () => {
  const toast = useToast();
  const queryClient = useQueryClient();
  const mutation = useMutation(createUser, {
    onSuccess: user => {
      toast({
        status: 'success',
        title: `${user.role} "${user.username}" created successfully.`
      });
      queryClient.invalidateQueries(CollectionName.USER);
    }
  });
  return mutation;
};

export default useCreateUser;
