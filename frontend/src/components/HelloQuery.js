// components/HelloQuery.js
import { useQuery, gql } from '@apollo/client';

const HELLO_QUERY = gql`
  query {
    hello
  }
`;

const HelloQuery = () => {
  const { loading, error, data } = useQuery(HELLO_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return <p>{data.hello}</p>;
};

export default HelloQuery;
