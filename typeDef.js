const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Client {
    id: ID!
    name: String!
    celphone: String
    email: String
    reservations: [Reservation]
  }

  type Reservation {
    id: ID!
    bookingStartDate: String!
    bookingEndDate: String!
    service: String!
    comments: String
    client: Client
  }

  type Query {
    hello: String
    getAllClient: [Client]
    getClientByID(id: ID!): Client
  }

  type Mutation {
    createClient(
      id: ID!
      name: String!
      celphone: String
      email: String
    ): Client

    createReservation(
      id: ID!
      bookingStartDate: String!
      bookingEndDate: String!
      service: String!
      comments: String
      idClient: ID!
    ): Reservation

    deleteClient(id: ID!): Client

    updateClient(id: ID!, name: String, celphone: String, email: String): Client
  }
`;

module.exports = { typeDefs };