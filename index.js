import path from "path";
import dotenv from "dotenv";
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "./.env") });

import {ApolloServer} from "apollo-server";
import {ApolloServerPluginLandingPageGraphQLPlayground} from "apollo-server-core";
import { typeDefs } from "./schemaGql.js";
import { connectToMongo } from "./db.js";

const MONGO_URI = process.env.MONGO_URI;

connectToMongo(MONGO_URI);

import "./models/User.js";
import "./models/Quote.js";

import { resolvers } from "./resolvers.js";

const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [
        ApolloServerPluginLandingPageGraphQLPlayground()
    ],
    context: ({ req }) => {
        return req
    },
});

server.listen().then(({url})=> {
    console.log(`Server ready at ${url}`);
})