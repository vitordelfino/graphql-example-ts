import {buildSchema} from "type-graphql";
import {UserMutation, UserQuery} from "../../model/user";
import {Container} from "typedi";

export const schema = async () => await buildSchema({
    resolvers: [
        UserQuery,
        UserMutation
    ],
    container: Container
});
