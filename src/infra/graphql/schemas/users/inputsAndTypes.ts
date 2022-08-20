import { gql } from 'apollo-server-express';

const inputsAndTypes = gql`
  scalar Date

  type User {
    id: String
    name: String!
    email: String!
    created_at: Date
    updated_at: Date
  }

  input UserInput {
    name: String!
    email: String!
    password: String!
  }

  type UserLoginOutput {
    id: String
    name: String
    email: String
  }

  type LoginOutput {
    user: UserLoginOutput
    token: String
  }

  input UserLoginInput {
    email: String!
    password: String!
  }
`;

export default inputsAndTypes;
