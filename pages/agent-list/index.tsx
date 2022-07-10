import type { NextPage } from 'next';
import { UserType } from '../../components/UI/DataTableComponent';
import { UserForm } from '../../components/UI/UserForm';

const AgentList: NextPage = () => (
  <div>
    <UserForm userRole={UserType.SuperAgent} />
  </div>
);

export default AgentList;
