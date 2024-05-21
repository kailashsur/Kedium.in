import client from "@/apollo/client";
import store from "@/store/store";
import "@/styles/globals.css";
import { ApolloProvider } from "@apollo/client";
import { Provider } from "react-redux";

export default function App({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </ApolloProvider>
  );
}
