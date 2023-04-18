import React from 'react';
import { Flex, Text, Spinner } from '@chakra-ui/react';

const Loader = () => {
  return (
    <Flex
      w={'100%'}
      h={'100vh'}
      pos={'fixed'}
      top={0}
      left={0}
      zIndex={1000}
      justifyContent={'center'}
      alignItems={'center'}
      bg={'white'}
      opacity={0.85}
    >
      <Flex alignItems={'center'} justifyContent={'center'} direction={'column'}>
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="teal.400"
          size="xl"
        />
        <Text color='teal' fontWeight={600} fontSize={15} mt={2} pl={4} letterSpacing={2}>Loading...</Text>
      </Flex>
    </Flex>
  );
};

export default Loader;
