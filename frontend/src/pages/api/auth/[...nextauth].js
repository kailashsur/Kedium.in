import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"


export const authOptions = {
    // Configure one or more authentication providers
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),

        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
        }),
        // ...add more providers here
    ],
    secret: process.env.SECRET_ACCESS_KEY,
    callbacks: {
        async jwt({ token, account }) {
          // Persist the access_token to the token right after signin
          if (account) {
            token.access_token = account.access_token;
          }
          return token;
        },
        async session({ session, token }) {
          // Send properties to the client, like an access_token from a provider
          session.access_token = token.access_token;
          return session;
        },
      },
}

export default NextAuth(authOptions)