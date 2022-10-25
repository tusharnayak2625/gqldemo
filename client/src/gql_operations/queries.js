import { gql } from "@apollo/client";

export const GET_ALL_QUOTES = gql`
  query getAllQuotes {
    quotes {
      name
      user {
        _id
        firstName
        email
      }
    }
  }
`;

export const GET_QUOTE = gql`
  query getQuote($id: String!) {
    quote: quote(id: $id) {
      name
    }
  }
`;

export const GET_PROFILE = gql`
  query profile {
    profile: profile {
      firstName
      lastName
      email
      quotes {
        name
      }
    }
  }
`;
