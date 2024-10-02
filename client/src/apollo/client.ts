// client.ts
import { ApolloClient, InMemoryCache, HttpLink, ApolloLink, Observable } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { getAccessToken } from '@/lib/utils';
import axios from 'axios';


// Function to get the access token
async function get_access_token() {
  const response = await axios.get('/api/getcookie');
  const access_token = response?.data?.UserAuth?.access_token;

  return access_token ? access_token : "";
}

// Auth link to attach the token to headers
const authLink = new ApolloLink((operation, forward) => {
  return new Observable(observer => {
    getAccessToken()
      .then(accessToken => {
        operation.setContext(({ headers = {} }) => ({
          headers: {
            ...headers,
            Authorization: accessToken ? `${accessToken}` : ""
          },
        }));

        const sub = forward(operation).subscribe({
          next: result => observer.next(result),
          error: observer.error.bind(observer),
          complete: observer.complete.bind(observer),
        });

        return () => sub.unsubscribe();
      })
      .catch(error => {
        console.error('Error retrieving access token:', error);
        observer.error(error);
      });
  });
});






// HTTP link to connect to the GraphQL server
const httpLink = new HttpLink({
  uri: `${process.env.NEXT_PUBLIC_API_URL}/graphql`,
});


// Error link to handle errors
const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.error(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
    );
  }

  if (networkError) {
    console.error(`[Network error]: ${networkError}`);
    // if (networkError.statusCode === 401) {
    //   // Optionally handle token refresh logic here
    // }
  }

  return forward(operation);
});

// Apollo Client setup
const client = new ApolloClient({
  link: ApolloLink.from([authLink, errorLink, httpLink]),
  cache: new InMemoryCache(),
  connectToDevTools: process.env.NODE_ENV !== 'production', // Enable Apollo DevTools in development
});

export default client;