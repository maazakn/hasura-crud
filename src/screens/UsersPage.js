import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { GET_USERS, ADD_USER, EDIT_USER, REMOVE_USER } from '../apollo/quries';
import UsersTable from '../components/Table';
import EditOrAddModal from '../components/EditOrAdd';
import { Box, Text, Flex, Button, useDisclosure } from '@chakra-ui/react';

const UsersPage = () => {
  const { loading, error, data } = useQuery(GET_USERS);
  const [users, setUsers] = useState(data);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [row, setRow] = React.useState(null);

  React.useEffect(() => {
    if (data) {
      setUsers(data.Users);
    }
  }, [data]);

  if (loading) {
    return <div className="tasks">Loading...</div>;
  }
  if (error) {
    return <div className="tasks">Error!</div>;
  }

  const handletModalOpen = row => {
    setRow(row);
    onOpen();
  };

  return (
    <Box p={4}>
      <Flex mb={2} justifyContent={'space-between'} alignItems={'center'}>
        <Text fontSize="2xl">All Users</Text>
        <Button
          colorScheme="teal"
          size="sm"
          onClick={() => handletModalOpen(null)}
        >
          Add User
        </Button>
      </Flex>

      <UsersTable data={users} handletModalOpen={handletModalOpen} />
      <EditOrAddModal isOpen={isOpen} onClose={onClose} row={row} />
    </Box>
  );
};

export default UsersPage;
