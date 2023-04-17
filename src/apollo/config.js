import { ApolloClient, InMemoryCache } from '@apollo/client';

export const client = new ApolloClient({
  uri: process.env.REACT_APP_APOLLO_URL,
  cache: new InMemoryCache(),
  headers: {
    'ontent-type': 'application/json',
    'x-hasura-admin-secret': process.env.REACT_APP_APOLLO_SECRET,
  },
});
