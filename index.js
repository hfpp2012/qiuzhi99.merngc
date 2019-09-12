const { ApolloServer } = require("apollo-server");

const gql = require("graphql-tag");

const mongoose = require("mongoose");

const typeDefs = gql`
  type Query {
    sayHi: String!
  }
`;

const resolvers = {
  Query: {
    sayHi: () => "hello world"
  }
};

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
