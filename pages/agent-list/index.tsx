import type { NextPage } from 'next';
import { UserTable, UserType } from '../../components/UI/UserTable';

const AgentList: NextPage = () => <UserTable userType={UserType.Agent} />;

export default AgentList;
