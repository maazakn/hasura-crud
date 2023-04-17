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
  mutation addUser {
    insert_Users_one(
      object: { name: "maaz", email: "maazahmed@gmail.com", contact: "5655556" }
    ) {
      id
      email
      contact
    }
  }
`;

export const EDIT_USER = gql`
  mutation editUser {
    update_Users_by_pk(
      _set: {
        email: "superUser@email.com"
        name: "SuperUser"
        contact: "9122322323"
      }
      pk_columns: { id: 4 }
    ) {
      contact
      email
      id
      name
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
