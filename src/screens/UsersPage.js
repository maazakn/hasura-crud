import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_USERS } from '../apollo/quries';
import UsersTable from '../components/Table';
import EditOrAddModal from '../components/EditOrAdd';
import { Box, Text, Flex, Button, useDisclosure} from '@chakra-ui/react';
import Loader from '../components/Loader';

const UsersPage = () => {
  const { loading, data } = useQuery(GET_USERS);
  const [users, setUsers] = useState(data);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [row, setRow] = React.useState(null);

  React.useEffect(() => {
    if (data) {
      setUsers(data.Users);
    }
  }, [data]);

  if (loading) {
    return <Loader />;
  }

  const afterCall = () => {
    setTimeout(() => {
      window.location.reload();
    }, 2500);
  };

  const handletModalOpen = row => {
    setRow(row);
    onOpen();
  };

  return (
    <Box p={8}>
      <Flex mb={4} justifyContent={'space-between'} alignItems={'center'}>
        <Text fontSize="2xl">All Users</Text>
        <Button
          colorScheme="teal"
          size="sm"
          onClick={() => handletModalOpen(null)}
        >
          Add User
        </Button>
      </Flex>

      <UsersTable
        data={users}
        handletModalOpen={handletModalOpen}
        afterCall={afterCall}
      />
      <EditOrAddModal
        isOpen={isOpen}
        onClose={onClose}
        row={row}
        afterCall={afterCall}
      />
    </Box>
  );
};

export default UsersPage;
