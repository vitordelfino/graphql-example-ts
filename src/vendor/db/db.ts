import { Mongoose, connect } from 'mongoose';
let isConnected: boolean = false;

export const connectToDatabase = () => {
    console.log('Start connecting db...');
    if (isConnected) {
        return Promise.resolve();
    }
    const defaultDb = `mongodb+srv://graphql-node-db:ynVJerEvYJKqn8nJ@cluster0-zvuc0.mongodb.net/test?retryWrites=true&w=majority`;
    const dbUri: string = defaultDb as string;
    return connect(dbUri, {useNewUrlParser: true})
        .then((db: Mongoose) => {
            console.log('Connected Succesfully');
            isConnected = db.connection.readyState === 1; // 1 for connected
        })
        .catch((error) => {
            console.log('db error:', error);
            return Promise.reject(error);
        });
};
