## Graph ql app.js

```javascript
const express = require('express');
const bodyParser = require('body-parser');
const graphqlHTTP = require('express-graphql');
const mongoose = require('./config/db');
const redisClient = require('./config/redis');
const errorHandler = require('./utils/errorHandler');
const userSchema = require('./schema/userSchema');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

require('dotenv').config();

const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// GraphQL
app.use('/graphql', graphqlHTTP({
    schema: userSchema,
    graphiql: true
}));

// Error handler
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

```