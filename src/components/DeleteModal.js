import React from 'react';
import { useMutation } from '@apollo/client';
import { REMOVE_USER } from '../apollo/quries';
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useToast,
} from '@chakra-ui/react';
import Loader from '../components/Loader';

const DeleteModal = ({ isOpen, onClose, row, afterCall }) => {
  const toast = useToast();
  const [remUserMutation, handleRem] = useMutation(REMOVE_USER);

  const handleDelete = () => {
    if (row) {
      (async () => {
        try {
          await remUserMutation({
            variables: { id: row?.id },
          });
          toast({
            title: 'User Deleted',
            status: 'success',
            isClosable: true,
            duration: 3000,
          });
          onClose();
          afterCall();
        } catch (error) {
          console.log(error);
          toast({
            title: 'Failed to remove a user',
            status: 'success',
            isClosable: true,
            duration: 3000,
          });
        }
      })();
    } else console.log('invalid Id');
  };

  if (handleRem.loading) {
    return <Loader />;
  }
  if (handleRem.error) {
    toast({
      title: 'Error occured check console',
      status: 'error',
      isClosable: true,
      duration: 3000,
    });
    return <Loader />;
  }

  return (
    <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Remove User</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>Are Your sure want to remove this record</ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleDelete}>
            Remove
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteModal;
