import type { NextPage } from 'next';
import {
  DataTableComponent,
  UserType
} from '../../components/UI/DataTableComponent';
import useCreateUser from '../../hooks/query/useCreateUser';
import useGetUsers from '../../hooks/query/useGetUsers';

const SuperAgentList: NextPage = () => {
  const { users, isGettingUsers } = useGetUsers();
  const { createUser, isCreatingUser } = useCreateUser();
  return (
    <div>
      <DataTableComponent
        data={users}
        isGettingUsers={isGettingUsers}
        userType={UserType.Admin}
        isCreatingUser={isCreatingUser}
        isEditingUser={false}
        isSuperPowerMode={true}
        onAddUser={createUser}
        onEditUser={user => {
          console.log(user);
        }}
        onDeleteUser={user => {}}
      />
    </div>
  );
};

export default SuperAgentList;
