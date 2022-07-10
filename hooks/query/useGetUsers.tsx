import axios from 'axios';
import { useQuery } from 'react-query';
import { User } from '../../components/UI/DataTableComponent';
import { CollectionName } from '../../DB/models/collectionName';

export const userAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL as string
});

const fetchUsers = async () => {
  const { data } = await userAxios.get('/get-all-user');
  return data.data as User[];
};

const useGetUsers = () => {
  const query = useQuery(CollectionName.USER, fetchUsers);
  return { query, users: query.data, isGettingUsers: query.isLoading };
};

export default useGetUsers;
