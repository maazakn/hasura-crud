import React from 'react';
import { ChakraProvider, theme } from '@chakra-ui/react';
import { ApolloProvider } from '@apollo/client';
import { client } from './apollo/config';
import UsersPage from './screens/UsersPage';

function App() {
  return (
    <ApolloProvider client={client}>
      <ChakraProvider theme={theme}>
        <UsersPage />
      </ChakraProvider>
    </ApolloProvider>
  );
}

export default App;
