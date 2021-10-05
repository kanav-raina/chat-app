const { createServer } =require("http") ;
const { execute, subscribe } =require("graphql") ;
const { SubscriptionServer } =require("subscriptions-transport-ws") ;
const { makeExecutableSchema } =require("@graphql-tools/schema") ;
const express =require("express") ;
const { ApolloServer } =require("apollo-server-express") ;
const { query } = require('./resolvers/queries/query');
const { mutation } = require('./resolvers/mutations/mutation')
const { subscription } = require('./resolvers/subscriptions/subscription')
const typeDefs = require('./schema/schema.js')
const { GraphQLScalarType, Kind } = require('graphql');

(async function () {
  const app = express();
  

    const dateScalar = new GraphQLScalarType({
        name: 'Date',
        description: 'Date custom scalar type',
        serialize(value) {
            return value.toISOString(); 
        },
        parseValue(value) {
            return new Date(value); 
        },
        parseLiteral(ast) {
            if (ast.kind === Kind.INT) {
            return new Date(parseInt(ast.value, 10)); // Convert hard-coded AST string to integer and then to Date
            }
            return null; // Invalid hard-coded value (not an integer)
        },
    });  
  const httpServer = createServer(app);
  const resolvers = {
    Query: query,
    Mutation:mutation,
    Subscription:subscription,
    Date: dateScalar 
  };  
  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  });

 
   const subscriptionServer = SubscriptionServer.create(
    { schema, execute, subscribe },
    { server: httpServer, path: `/graphql`}
  );

  const server = new ApolloServer({
    schema,
    playground: {
        subscriptionEndpoint: 'ws://localhost:4000/graphql'
    },
    subscriptions: {
        keepAlive: 9000,
        onConnect: (connParams, webSocket, context) => {
            console.log('CLIENT CONNECTED');
        },
        onDisconnect: (webSocket, context) => {
            console.log('CLIENT DISCONNECTED')
        }
    }
  });


  await server.start();
  server.applyMiddleware({ app });

  const PORT = 4000;
  httpServer.listen(PORT, () =>
    console.log(`Server is now running on http://localhost:${PORT}/graphql`)
  );
})();
