// src/index.js
import express, { Express, Request, Response } from "express";
import passport from "passport";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { errorHandler } from "./utils/errorHandlers";
import cors from 'cors';
import cookieParser from "cookie-parser";
import init from "./start.services";
import blog_router from "./routes/blog.routes";
import log_router from "./routes/logs.routes";
import { ApolloServer } from "@apollo/server";
import gqlSchema from "./services/graphql/schema/index.schema";
import gqlResolvers from "./services/graphql/resolvers/resolvers.graphql";
import { expressMiddleware } from "@apollo/server/express4";
import bodyParser from "body-parser";
import { verifyJWT } from "./middlewares/auth.middleware";
import service_router from "./routes/service.routes";
import path from "path";







/**
 * Initialize Express
 */
const app = express();


/**
 * Http headers security
 * 
 *  */
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}))
app.use(cors());
app.use(express.json({ limit: '16kb' }));   // Body limit is 16kb 
app.use(express.urlencoded({ extended: true, limit: '16kb' }));     // Body limit is 16kb
app.use(express.static('public'));  // To serve static files
app.use(passport.initialize());
app.use(cookieParser());
app.use(helmet());


/**
 * Rate limiting
 */
app.use(rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minutes
    max: 100 // limit each IP to 100 requests per windowMs
}))

/**
 * Connect to MongoDB
 */

// init();


/**
 * Routes
 */
app.get('/', (req, res) => {
    res.status(200).json({ message: 'Blog Service is running' });
});
//--- Router import
app.use('/api/v1/', blog_router)
app.use('/api/v1/', log_router);
app.use('/api/v1/service', service_router);



app.use(express.static(path.join(__dirname, '../public/web')));

/**
 * Google OAuth
 */
// FIXME: Graphql server is not working
const graphqlServer = new ApolloServer({
    typeDefs: gqlSchema,
    resolvers: gqlResolvers,
    introspection: true,
    csrfPrevention: true,
    cache: 'bounded',
});

// Start the Apollo Server before using expressMiddleware
(async () => {
    await graphqlServer.start();

    app.use(
        "/graphql",
        cors(),
        bodyParser.json(),
        // verifyJWT,
        expressMiddleware(graphqlServer,
            // {
            //     context: async ({ req }) => ({
            //         user: req.user,
            //     }),
            // }
        ),
    );
})();





/**
 * Error handling
 */
app.use(errorHandler);


export default app;
/**
 * Start Server
 */

