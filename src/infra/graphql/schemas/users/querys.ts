import { gql } from 'apollo-server-express';

const querys = gql`
  type Query {
    login(data: UserLoginInput): LoginOutput
  }
`;

export default querys;
