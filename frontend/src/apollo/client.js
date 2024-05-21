// frontend/apollo/client.js
import { ApolloClient, InMemoryCache } from '@apollo/client';


const client = new ApolloClient({
  uri: 'http://localhost:8000/graphql', // Specify the URI of your GraphQL API
  cache: new InMemoryCache(),
});

export default client;
