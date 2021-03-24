const { ApolloServer, PubSub } = require("apollo-server");
const mongoose = require("mongoose");

const typeDefs = require('../graphql/typeDefs');
const resolvers = require('../graphql/resolvers');

const pubsub = new PubSub();

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({req}) => ({req, pubsub})
});

const connectDB = async () => {
    await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: true,
    })
    .then(() => {
        console.log('MongoDB Connected');
        return server.listen({port:5000});
    })
    .then(res => {
        console.log(`Server running at ${res.url}`)
    })
};

module.exports = connectDB;