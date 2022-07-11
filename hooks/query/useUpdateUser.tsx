import { useToast } from '@chakra-ui/react';
import { useMutation, useQueryClient } from 'react-query';
import { User } from '../../components/UI/UserTable';
import { CollectionName } from '../../DB/models/collectionName';
import { userAxios } from '../../utils/userAxios';

const updateUser = async (updatedUser: User) => {
  const { data } = await userAxios.patch(`/${updatedUser._id}`, updatedUser);
  return data.data as User;
};

const useUpdateUser = () => {
  const toast = useToast();
  const queryClient = useQueryClient();
  const mutation = useMutation((updatedUser: User) => updateUser(updatedUser), {
    onSuccess: updatedUser => {
      toast({
        status: 'success',
        title: `${updatedUser.role} "${updatedUser.username}" updated successfully.`
      });
      queryClient.invalidateQueries(CollectionName.USER);
    }
  });
  return mutation;
};

export default useUpdateUser;
