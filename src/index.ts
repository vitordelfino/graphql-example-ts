import "reflect-metadata"
import {schema} from "./vendor/graphql/schema";
import express = require("express");
import {ApolloServer} from "apollo-server-express";
import {connectToDatabase} from "./vendor/db/db";

async function run() {
    await connectToDatabase();
    const GrapgSchema = await schema();

    const app = express();

    const server = new ApolloServer({
        schema: GrapgSchema,
        context: {

        }
    })
    server.applyMiddleware({ app })
    app.listen({ port: 3000 }, () => console.log(`run graphql`));
}

try {
    run()
}catch(e) {
    console.log('error to start:', e.message);
}
