import React from 'react';
import {
  Flex,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Td,
  TableCaption,
  Tbody,
  useDisclosure,
  Button,
} from '@chakra-ui/react';
import DeleteModal from './DeleteModal';

const UsersTable = ({ data, handletModalOpen, afterCall }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [row, setRow] = React.useState(null);

  const handleDelte = row => {
    setRow(row);
    onOpen();
  };

  return (
    <>
      <TableContainer>
        <Table variant="simple" border="1px" borderColor="gray.200">
          <TableCaption>CRUD operations using Hasura</TableCaption>
          <Thead>
            <Tr>
              <Th>id</Th>
              <Th>Name</Th>
              <Th>Email</Th>
              <Th>Contact</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data && Array.isArray(data) &&
              data?.map((user, key) => (
                <Tr key={key}>
                  <Td>{user?.id}</Td>
                  <Td>{user?.name}</Td>
                  <Td>{user?.email}</Td>
                  <Td>{user?.contact}</Td>

                  <Flex
                    as={Td}
                    justifyContent={'space-between'}
                    alignItems={'center'}
                    w={'10rem'}
                  >
                    <Button
                      colorScheme="blue"
                      size="xs"
                      onClick={() => handletModalOpen(user)}
                    >
                      Edit
                    </Button>
                    <Button
                      colorScheme="pink"
                      size="xs"
                      onClick={() => handleDelte(user)}
                    >
                      Remove
                    </Button>
                  </Flex>
                </Tr>
              ))}
          </Tbody>
        </Table>
      </TableContainer>
      <DeleteModal
        isOpen={isOpen}
        onClose={onClose}
        row={row}
        afterCall={afterCall}
      />
    </>
  );
};

export default UsersTable;
