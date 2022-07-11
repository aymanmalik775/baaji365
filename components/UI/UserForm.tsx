/* eslint-disable react/no-children-prop */
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Stack,
  useDisclosure
} from '@chakra-ui/react';
import { useEffect, useRef } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { User, UserType } from './UserTable';
import { FaWhatsapp, FaFacebook, FaLink } from 'react-icons/fa';

export enum FormMode {
  Create,
  Edit
}

type Props = {
  defaultUser?: User;
  userRole: UserType;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onCreateUser: (user: User) => void;
  onEditUser: (user: User) => void;
  isSubmitting: boolean;
};

interface Inputs extends User {}

const userRolesToSelect = ['Admin', 'Super Agent', 'Agent'];

export function UserForm({
  defaultUser,
  userRole,
  onCreateUser,
  onEditUser,
  isSubmitting,
  isOpen,
  onClose,
  onOpen
}: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<Inputs>();

  const formMode = defaultUser ? FormMode.Edit : FormMode.Create;
  const title =
    formMode === FormMode.Create
      ? `Create a new ${userRole}`
      : `Edit ${userRole} "${defaultUser?.username}"`;

  const onSubmit: SubmitHandler<Inputs> = data => {
    const final: User = {
      ...data,
      whatsappLink: `wa.me/${data.whatsappNumber}`
    };
    formMode === FormMode.Create ? onCreateUser(final) : onEditUser(final);
  };

  useEffect(() => {
    if (defaultUser) {
      reset({
        username: defaultUser?.username,
        role: defaultUser?.role ?? userRole,
        fbLink: defaultUser?.fbLink,
        fbName: defaultUser?.fbName,
        whatsappNumber: defaultUser?.whatsappNumber,
        complainToUserIdLink: defaultUser?.complainToUserIdLink,
        complainToUserName: defaultUser?.complainToUserName
      });
      onOpen();
    } else
      reset({
        username: '',
        role: userRole,
        fbLink: '',
        fbName: '',
        whatsappNumber: '',
        complainToUserIdLink: '',
        complainToUserName: ''
      });
  }, [defaultUser, onOpen, reset, userRole]);

  return (
    <>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <form onSubmit={handleSubmit(onSubmit)}>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader borderBottomWidth="1px">{title}</DrawerHeader>

            <DrawerBody>
              <Stack spacing={6}>
                <FormControl isInvalid={!!errors.role}>
                  <FormLabel fontSize="sm" htmlFor="role">
                    Role
                  </FormLabel>
                  <Select
                    id="role"
                    isReadOnly={formMode !== FormMode.Edit}
                    pointerEvents={formMode !== FormMode.Edit ? 'none' : 'auto'}
                    {...register('role', {
                      required: 'required'
                    })}
                  >
                    {userRolesToSelect.map(role => (
                      <option key={role} value={role}>
                        {role}
                      </option>
                    ))}
                  </Select>
                  <FormErrorMessage>
                    {errors.role && errors.role.message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={!!errors.username}>
                  <FormLabel fontSize="sm" htmlFor="username">
                    Name
                  </FormLabel>
                  <Input
                    id="username"
                    placeholder={`Please enter ${String(
                      userRole
                    ).toLowerCase()} name`}
                    {...register('username', {
                      required: 'required'
                    })}
                  />
                  <FormErrorMessage>
                    {errors.username && errors.username.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={!!errors.fbName}>
                  <FormLabel fontSize="sm" htmlFor="fbName">
                    Facebook name
                  </FormLabel>
                  <InputGroup>
                    <InputLeftElement
                      fontSize={18}
                      pointerEvents="none"
                      children={<FaFacebook />}
                    />
                    <Input
                      id="fbName"
                      placeholder={`Enter facebook id name`}
                      {...register('fbName', {
                        required: 'required'
                      })}
                    />
                  </InputGroup>
                  <FormErrorMessage>
                    {errors.fbName && errors.fbName.message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={!!errors.fbLink}>
                  <FormLabel fontSize="sm" htmlFor="fbLink">
                    Facebook link
                  </FormLabel>
                  <InputGroup>
                    <InputLeftElement
                      fontSize={18}
                      pointerEvents="none"
                      children={<FaLink />}
                    />
                    <Input
                      id="fbLink"
                      placeholder={`Enter facebook link`}
                      {...register('fbLink', {
                        required: 'required'
                      })}
                    />
                  </InputGroup>
                  <FormErrorMessage>
                    {errors.fbLink && errors.fbLink.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={!!errors.whatsappNumber}>
                  <FormLabel fontSize="sm" htmlFor="whatsappNumber">
                    Whatsapp number(with country code)
                  </FormLabel>
                  <InputGroup>
                    <InputLeftElement
                      fontSize={18}
                      pointerEvents="none"
                      children={<FaWhatsapp />}
                    />
                    <Input
                      id="whatsappNumber"
                      placeholder={`Enter whatsapp number`}
                      {...register('whatsappNumber', {})}
                    />
                  </InputGroup>
                </FormControl>

                <FormControl isInvalid={!!errors.complainToUserName}>
                  <FormLabel fontSize="sm" htmlFor="complainToName">
                    Complain To User Name
                  </FormLabel>
                  <Input
                    id="complainToName"
                    placeholder={`Enter username to complain`}
                    {...register('complainToUserName', {
                      required: 'required'
                    })}
                  />
                  <FormErrorMessage>
                    {errors.complainToUserName &&
                      errors.complainToUserName.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={!!errors.complainToUserIdLink}>
                  <FormLabel fontSize="sm" htmlFor="complaintoidli">
                    Complain to User Id Link (Fb/Whatsapp)
                  </FormLabel>
                  <Input
                    id="complaintoidli"
                    placeholder={`Enter user id link to complain`}
                    {...register('complainToUserIdLink', {
                      required: 'required'
                    })}
                  />
                  <FormErrorMessage>
                    {errors.username && errors.username.message}
                  </FormErrorMessage>
                </FormControl>
              </Stack>
            </DrawerBody>

            <DrawerFooter borderTopWidth="1px">
              <Button variant="outline" mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button isLoading={isSubmitting} type="submit" colorScheme="blue">
                Submit
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </form>
      </Drawer>
    </>
  );
}
