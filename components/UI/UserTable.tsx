import { AddIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons';
import {
  Box,
  Heading,
  IconButton,
  Link,
  Spinner,
  Text,
  useDisclosure
} from '@chakra-ui/react';
import { useMemo, useState } from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';
import useCreateUser from '../../hooks/query/useCreateUser';
import useDeleteUser from '../../hooks/query/useDeleteUser';
import useGetUsers from '../../hooks/query/useGetUsers';
import useUpdateUser from '../../hooks/query/useUpdateUser';
import { UserForm } from './UserForm';

export type User = {
  _id: string;
  username: string;
  role: UserType;
  fbLink: string;
  fbName: string;
  whatsappNumber: string;
  whatsappLink: string;
  complainToUserName: string;
  complainToUserIdLink: string;
};

export enum UserType {
  Admin = 'Admin',
  SuperAgent = 'Super Agent',
  Agent = 'Agent'
}

type Props = {
  userType: UserType;
  isSuperPowerMode?: boolean;
};

const getRenderedList = (label: string, link: string) => (
  <Link
    color="blue.600"
    href={link.startsWith('http') ? link : `//${link}`}
    isExternal
  >
    {label}
  </Link>
);

export function UserTable({ userType, isSuperPowerMode = true }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [userToEdit, setUserToEdit] = useState<User>();
  const { data: users, isLoading: isGettingUsers } = useGetUsers(userType);
  const { isLoading: isCreatingUser, mutateAsync: createUser } =
    useCreateUser();
  const { mutateAsync: deleteUser, isLoading: isDeletingUser } =
    useDeleteUser();
  const { mutateAsync: updateUser, isLoading: isUpdatingUser } =
    useUpdateUser();

  const columns = useMemo(() => {
    const colsToRender: TableColumn<User>[] = [
      {
        name: 'Role',
        selector: user => user.role
      },
      {
        name: 'Name',
        selector: user => user.username
      },
      {
        name: 'Facebook',
        cell: user => getRenderedList(user.fbName, user.fbLink)
      },
      {
        name: 'Whatsapp',
        cell: user => getRenderedList(user.whatsappNumber, user.whatsappLink)
      },
      {
        name: 'Complain',
        cell: user =>
          getRenderedList(user.complainToUserName, user.complainToUserIdLink)
      }
    ];

    if (isSuperPowerMode) {
      colsToRender.push({
        name: 'Action',
        cell: user => (
          <>
            <IconButton
              onClick={() => {
                deleteUser(user);
              }}
              margin={1}
              colorScheme="red"
              aria-label="Delete"
              size="sm"
              icon={<DeleteIcon />}
            />
            <IconButton
              onClick={() => setUserToEdit(user)}
              margin={1}
              colorScheme="teal"
              aria-label="Edit"
              size="sm"
              icon={<EditIcon />}
            />
          </>
        )
      });
    }
    return colsToRender;
  }, [deleteUser, isSuperPowerMode]);

  return (
    <>
      <Box>
        <Box display="flex" justifyContent="center" padding={5}>
          <Heading as="h1" size="lg" marginRight={2}>
            {userType} List
          </Heading>
          {isSuperPowerMode && (
            <IconButton
              onClick={onOpen}
              borderRadius="50%"
              margin={1}
              colorScheme="teal"
              aria-label="Edit"
              size="sm"
              icon={<AddIcon />}
            />
          )}
        </Box>
        <DataTable
          pagination
          columns={columns}
          data={users ?? []}
          progressPending={isGettingUsers}
          progressComponent={
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
            />
          }
        />
      </Box>
      <UserForm
        isOpen={isOpen}
        onClose={() => {
          setUserToEdit(undefined);
          onClose();
        }}
        onOpen={onOpen}
        userRole={userType}
        onCreateUser={user => {
          createUser(user);
          onClose();
        }}
        onEditUser={user => {
          userToEdit && updateUser({ ...user, _id: userToEdit._id });
          onClose();
        }}
        isSubmitting={isCreatingUser || isUpdatingUser}
        defaultUser={userToEdit}
      />
    </>
  );
}