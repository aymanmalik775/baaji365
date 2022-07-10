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
import { useEffect, useMemo, useState } from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';
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
  data?: User[];
  isSuperPowerMode?: boolean;
  isGettingUsers?: boolean;
  onAddUser: (user: User) => void;
  onEditUser: (user: User) => void;
  onDeleteUser: (user: User) => void;
  isCreatingUser: boolean;
  isEditingUser: boolean;
};

const getRenderedList = (label: string, link: string) => (
  <Link color="blue.600" href={`//${link}`} isExternal>
    {label}
  </Link>
);

export function DataTableComponent({
  userType,
  data,
  isSuperPowerMode = true,
  isGettingUsers,
  isCreatingUser,
  isEditingUser,
  onAddUser,
  onDeleteUser,
  onEditUser
}: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [userToEdit, setUserToEdit] = useState<User>();

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
                onDeleteUser(user);
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
  }, [isSuperPowerMode, onDeleteUser]);

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
          data={data ?? []}
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
          onAddUser && onAddUser(user);
        }}
        onEditUser={user => {
          onEditUser && onEditUser(user);
        }}
        isSubmitting={isCreatingUser || isEditingUser}
        defaultUser={userToEdit}
      />
    </>
  );
}
