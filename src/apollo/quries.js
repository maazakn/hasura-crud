import { gql } from '@apollo/client';

export const GET_USERS = gql`
  query getUsers {
    Users {
      id
      name
      email
      contact
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($object: Users_insert_input!) {
    insert_Users_one(object: $object) {
      contact
      email
      id
      name
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser($id: Int!, $_set: Users_set_input) {
    update_Users_by_pk(pk_columns: { id: $id }, _set: $_set) {
      id
      name
      email
      contact
    }
  }
`;

export const REMOVE_USER = gql`
  mutation removeUser($id: Int!) {
    delete_Users_by_pk(id: $id) {
      id
      name
      email
      contact
    }
  }
`;
