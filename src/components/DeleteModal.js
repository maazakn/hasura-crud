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
} from '@chakra-ui/react';

const DeleteModal = ({ isOpen, onClose, row }) => {
  const [remUserMutation, handleRem] = useMutation(REMOVE_USER);

  const handleDelete = () => {
    if (row) {
      console.log(row);
      (async () => {
        try {
          const result = await remUserMutation({
            variables: { id: row?.id },
          });
          console.log(result.data.data.delete_Users_by_pk);
        } catch (error) {
          console.log(error);
        }
      })();
    } else console.log('invalid Id');
  };

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
