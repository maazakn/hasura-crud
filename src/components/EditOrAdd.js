import { useMutation } from '@apollo/client';
import { ADD_USER, EDIT_USER } from '../apollo/quries';
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
} from '@chakra-ui/react';
import { useForm, Controller } from 'react-hook-form';

const EditOrAdd = ({ isOpen, onClose, row }) => {
  const {
    setValue,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const [addUserMutation, handleAdd] = useMutation(ADD_USER);
  const [editUserMutation, handleEdit] = useMutation(EDIT_USER);

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
  }, [row, setValue]);

  const submitHandler = data => {
    const postData = {
      name: data.name,
      email: data.email,
      contact: data.contact,
    };

    if (row) {
      (async () => {
        try {
            console.log({id: row?.id, ...postData});
          const result = await editUserMutation({
            variables: { id: row?.id, ...postData },
          });
          console.log(result.data.update_Users_by_pk);
        } catch (error) {
          console.log(error);
        }
      })();
    } else {
      (async () => {
        try {
          const result = await addUserMutation({
            variables: postData,
          });
          console.log(result.data.insert_Users_one);
        } catch (error) {
          console.log(error);
        }
      })();
    }
  };

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
