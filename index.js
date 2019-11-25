const { ApolloServer } = require("apollo-server");

const mongoose = require("mongoose");

const { MONGODB } = require("./config");

const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req })
});

mongoose
  .connect(MONGODB, {
    useNewUrlParser: true
  })
  .then(() => {
    console.log("MongoDB Connected");
    return server.listen({ port: 5001 });
  })
  .then(res => {
    console.log(`Server running at ${res.url}`);
  })
  .catch(err => {
    console.error(err);
  });
