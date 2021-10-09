const http = require('http');
const { ApolloServer } = require('apollo-server-express');
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core');
const { execute, subscribe } = require('graphql');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const { SubscriptionServer } = require('subscriptions-transport-ws');
const express = require('express');
const { query } = require('./resolvers/queries/query');
const {subscription} = require('./resolvers/subscriptions/subscription')
const { mutation } = require('./resolvers/mutations/mutation')

const port = 4444;

const app = express();


const typeDefs = require('./schema/schema.js')
const resolvers = {
    Query: query,
    Mutation:mutation,
    Subscription:subscription
  }
const schema = makeExecutableSchema({ typeDefs, resolvers });

async function start() {
  const httpServer = http.createServer(app);
  const subscriptionServer = SubscriptionServer.create({
    schema, execute, subscribe
  }, {
    server: httpServer, path: '/graphql'
  });

  const httpServerPlugin = ApolloServerPluginDrainHttpServer({ httpServer });
  const subscriptionServerPlugin = {
    async serverWillStart() {
      return {
        async drainServer() {
          subscriptionServer.close();
        }
      };
    }
  };
  const apolloServer = new ApolloServer({
    schema,
    plugins: [httpServerPlugin, subscriptionServerPlugin]
  });
  await apolloServer.start();
  apolloServer.applyMiddleware({ app, path: '/graphql' });

  httpServer.listen(port, () => console.log(`Server started on port ${port}`));
}

start();
