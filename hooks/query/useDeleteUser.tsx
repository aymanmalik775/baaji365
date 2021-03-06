import { useToast } from '@chakra-ui/react';
import { useMutation, useQueryClient } from 'react-query';
import { User } from '../../components/UI/UserTable';
import { CollectionName } from '../../DB/models/collectionName';
import { userAxios } from '../../utils/userAxios';

const deleteUser = async (userId: string) => {
  const response = await userAxios.delete(`/${userId}`);
  return response;
};

const useDeleteUser = () => {
  const toast = useToast();
  const queryClient = useQueryClient();
  const mutation = useMutation((user: User) => deleteUser(user._id), {
    onSuccess: (_data, user) => {
      toast({
        status: 'success',
        title: `${user.role} "${user.username}" deleted successfully.`
      });
      queryClient.invalidateQueries(CollectionName.USER);
    }
  });
  return mutation;
};

export default useDeleteUser;
