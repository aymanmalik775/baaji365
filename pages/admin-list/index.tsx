import type { NextPage } from 'next';
import { UserTable, UserType } from '../../components/UI/UserTable';

const SuperAgentList: NextPage = () => {
  return <UserTable userType={UserType.Admin} />;
};

export default SuperAgentList;
