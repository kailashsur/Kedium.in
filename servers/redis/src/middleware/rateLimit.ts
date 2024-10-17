import rateLimit from 'express-rate-limit';
import Redis from 'ioredis';
import RedisStore from 'rate-limit-redis';


const redisClient = new Redis();

const limiter = rateLimit({
    store : new RedisStore({
        sendCommand: async (...args: [string, ...unknown[]]): Promise<any> => {
            return redisClient.call(args[0] as string, ...(args.slice(1) as (string | number | Buffer)[])) as any;
        }
    }),
    windowMs: 1000 * 60 * 15, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs

  });
  
  export default limiter;