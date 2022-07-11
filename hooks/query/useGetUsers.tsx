import { useQuery, useQueryClient } from 'react-query';
import { User, UserType } from '../../components/UI/UserTable';
import { CollectionName } from '../../DB/models/collectionName';
import { userAxios } from '../../utils/userAxios';

const fetchUsers = async (userType?: UserType) => {
  const { data } = await userAxios.get(
    userType ? `?userType=${userType}` : '/'
  );
  return data.data as User[];
};

const useGetUsers = (userRole?: UserType) => {
  const query = useQuery(CollectionName.USER, () => fetchUsers(userRole));
  return query;
};

export default useGetUsers;

export const usePrefetchUsers = () => {
  const queryClient = useQueryClient();

  const prefetch = async () => {
    queryClient.prefetchQuery(CollectionName.USER, () => fetchUsers());
  };

  return prefetch;
};
