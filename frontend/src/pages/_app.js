import client from "@/apollo/client";
import store from "@/store/store";
import "@/styles/globals.css";
import "@/styles/fonts.css";
import { ApolloProvider } from "@apollo/client";
import { Provider } from "react-redux";

// import nextauth for authenticatiaon
import { SessionProvider } from "next-auth/react";


export default function App({ Component, pageProps }) {



  return (
    <ApolloProvider client={client}>

<SessionProvider session={pageProps.session}>

      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>

</SessionProvider>

    </ApolloProvider>
  );
}
