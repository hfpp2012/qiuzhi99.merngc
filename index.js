const { ApolloServer } = require("apollo-server");

const mongoose = require("mongoose");

const Post = require("./models/Post");

const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");

const server = new ApolloServer({
  typeDefs,
  resolvers
});

mongoose
  .connect("mongodb://test:A12345678@ds119820.mlab.com:19820/merng", {
    useNewUrlParser: true
  })
  .then(() => {
    console.log("MongoDB Connected");
    return server.listen({ port: 5001 });
  })
  .then(res => {
    console.log(`Server running at ${res.url}`);
  });
