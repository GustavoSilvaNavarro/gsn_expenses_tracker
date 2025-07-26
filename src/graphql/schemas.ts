import { gql } from 'mercurius-codegen';

export const graphQlSchemas = gql`
  type User {
    id: Int
    email: String
    name: String
    lastname: String
    householdId: ID
    expenses: [Expenses]
    createdAt: String
    updatedAt: String
  }

  type Expenses {
    id: Int
    amount: Float
    timestamp: String
    categoryId: Int
    userId: Int
    createdAt: String
    updatedAt: String
  }

  # Query Types
  type Query {
    getUsersWithExpenses(householdId: ID!): [User!]!
  }
`;
