import { gql } from "@apollo/client";

export const REGISTER_USER = gql`
  mutation registerUser($newuser: UserInput!) {
    user: registerUser(newUser: $newuser) {
      token
    }
  }
`;

export const LOGIN_USER = gql`
  mutation loginUser($userLogin: loginInput!) {
    user: loginUser(userLogin: $userLogin) {
      token
    }
  }
`;

export const ADD_QUOTE = gql`
  mutation addQuote($quote: quoteInput!) {
    quote: createQuote(quote: $quote) {
      name
    }
  }
`;