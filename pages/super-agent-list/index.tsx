import type { NextPage } from 'next';
import { UserTable, UserType } from '../../components/UI/UserTable';

const AdminList: NextPage = () => {
  return <UserTable userType={UserType.SuperAgent} />;
};

export default AdminList;
