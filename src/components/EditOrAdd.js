import { useMutation } from '@apollo/client';
import { ADD_USER, UPDATE_USER } from '../apollo/quries';
import React from 'react';
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Input,
  InputGroup,
  InputLeftAddon,
  Stack,
  Text,
  Box,
  useToast,
} from '@chakra-ui/react';
import { useForm, Controller } from 'react-hook-form';
import Loader from '../components/Loader';

const EditOrAdd = ({ isOpen, onClose, row, afterCall }) => {
  const toast = useToast();
  const {
    setValue,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const [addUserMutation, handleAdd] = useMutation(ADD_USER);
  const [editUserMutation, handleEdit] = useMutation(UPDATE_USER);

  React.useEffect(() => {
    if (row) {
      setValue('name', row?.name);
      setValue('email', row?.email);
      setValue('contact', row?.contact);
    } else {
      setValue('name', '');
      setValue('email', '');
      setValue('contact', '');
    }
  }, [row, setValue, isOpen]);

  const submitHandler = data => {
    const postData = {
      name: data.name,
      email: data.email,
      contact: data.contact,
    };

    if (row) {
      (async () => {
        try {
          await editUserMutation({
            variables: { id: row?.id, _set: postData },
          });
          toast({
            title: 'User Updated',
            status: 'success',
            isClosable: true,
            duration: 3000,
          });
          onClose();
          // afterCall();
        } catch (error) {
          console.log(error);
          toast({
            title: 'Failed to Edit a User',
            status: 'error',
            isClosable: true,
            duration: 3000,
          });
        }
      })();
    } else {
      (async () => {
        try {
          await addUserMutation({
            variables: {
              object: {
                ...postData,
              },
            },
          });
          toast({
            title: 'User Added',
            status: 'success',
            isClosable: true,
            duration: 3000,
          });
          onClose();
          afterCall();
        } catch (error) {
          console.log(error);
          toast({
            title: 'Failed to Add a User',
            status: 'error',
            isClosable: true,
            duration: 3000,
          });
        }
      })();
    }
  };

  if (handleAdd.loading || handleEdit.loading) {
    return <Loader />;
  }

  return (
    <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{row ? 'Edit' : 'Add'} User</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleSubmit(submitHandler)}>
          <ModalBody pb={6}>
            <Stack spacing={4}>
              <Box>
                <InputGroup>
                  <InputLeftAddon children="Name" />
                  <Controller
                    name="name"
                    control={control}
                    rules={{ required: 'Name is required.' }}
                    render={({ field }) => (
                      <Input
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="Enter name"
                      />
                    )}
                  />
                </InputGroup>
                {errors.name && (
                  <Text fontSize="14px" color="tomato" mt={1}>
                    {errors.name.message}
                  </Text>
                )}
              </Box>
              <Box>
                <InputGroup>
                  <InputLeftAddon children="Email" />
                  <Controller
                    name="email"
                    control={control}
                    rules={{ required: 'Email is required.' }}
                    render={({ field }) => (
                      <Input
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="Enter email"
                      />
                    )}
                  />
                </InputGroup>
                {errors.name && (
                  <Text fontSize="14px" color="tomato" mt={1}>
                    {errors.email.message}
                  </Text>
                )}
              </Box>
              <Box>
                <InputGroup>
                  <InputLeftAddon children="Contact" />
                  <Controller
                    name="contact"
                    control={control}
                    rules={{ required: 'Contact is required.' }}
                    render={({ field }) => (
                      <Input
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="Enter contact"
                      />
                    )}
                  />
                </InputGroup>
                {errors.name && (
                  <Text fontSize="14px" color="tomato" mt={1}>
                    {errors.contact.message}
                  </Text>
                )}
              </Box>
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} type="submit">
              {row ? 'Update' : 'Save'}
            </Button>
            <Button onClick={onClose} type="button">
              Cancel
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default EditOrAdd;
