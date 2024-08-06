// frontend/apollo/client.js
import { ApolloClient, InMemoryCache, ApolloLink, HttpLink } from '@apollo/client';
import axios from 'axios';

// Function to get the access token
async function get_access_token() {
  const response = await axios.get('/api/getcookie');
  const access_token = response?.data?.UserAuth?.access_token;

  return access_token ? access_token : "";
}

// Create an HTTP link to your GraphQL server
const httpLink = new HttpLink({
  uri: `${process.env.API_URL}/graphql`, // Replace with your backend URL
});

// Middleware to include the token in the headers
const authLink = new ApolloLink(async (operation, forward) => {
  // Retrieve the access token
  const access_token = await get_access_token();

  // Set the HTTP headers
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      Authorization: access_token ? `${access_token}` : "",
    },
  }));

  // Call the next link in the middleware chain
  return forward(operation);
});

const client = new ApolloClient({
  link: authLink.concat(httpLink), // Combine authLink and httpLink
  cache: new InMemoryCache(),
});

export default client;
