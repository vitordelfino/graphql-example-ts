import {buildSchema} from "type-graphql";
import {UserMutation, UserQuery} from "../../model/user";
import {Container} from "typedi";
import {TaskMutation, TaskQuery} from "../../model/task";

export const schema = async () => await buildSchema({
    resolvers: [
        UserQuery,
        UserMutation,
        TaskQuery,
        TaskMutation
    ],
    container: Container
});
