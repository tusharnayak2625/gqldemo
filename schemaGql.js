import { gql } from "apollo-server-express";

export const typeDefs = gql`
    type Query{
        users:[User]
        quotes:[Quote]
        quote(id:String!):Quote
        profile:User
    }

    type User{
        firstName:String!
        lastName:String!
        email:String!
        quotes:[Quote]!
    }

    type Quote{
        name:String!
        user:quoteUser!
    }

    type quoteUser{
        _id:String!
        firstName:String!
        email:String!
    }

    type Token{
        token:String!
    }

    type Mutation{
        registerUser(newUser:UserInput!):Token
        loginUser(userLogin:loginInput!):Token
        createQuote(quote:quoteInput!):Quote
    }

    input UserInput{
        firstName:String!
        lastName:String!
        email:String!
        password:String!
    }

    input loginInput{
        email:String!
        password:String!
    }

    input quoteInput{
        name:String!
    }
`;