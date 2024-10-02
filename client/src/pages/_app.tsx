import "@/styles/globals.css";
import "@/styles/fonts.css";
import type { AppProps } from "next/app";

// import client from "@/apollo/client"
// import store from "@/store/store"
import store from "@/store/store";
import "@/styles/globals.css";
import "@/styles/fonts.css";
import CustomApolloProvider from "@/apollo/ApolloProvider";
import { Provider } from "react-redux";


// Import next-auth for authentication
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";  // Import Session type from next-auth

// Define the types for pageProps including the session
interface MyAppProps extends AppProps {
  pageProps: {
    session?: Session;
  };
}

export default function App({ Component, pageProps }: MyAppProps) {
  return (
    <CustomApolloProvider>
      <SessionProvider session={pageProps.session}>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </SessionProvider>
    </CustomApolloProvider>
  );
}
