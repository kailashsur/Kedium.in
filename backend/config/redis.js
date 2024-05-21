// Redis configuration

import redis from "redis";


const redisClient = redis.createClient();

redisClient.on('connect', () => {
    console.log('Connected to Redis');
});

export default redisClient;
