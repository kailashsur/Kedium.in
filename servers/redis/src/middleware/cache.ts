// Code to cache data in Redis
import Redis from 'ioredis';



const redisClient = new Redis(); 

export const cache = (req: any, res: any, next: any) => {
  const key = req.url;
  redisClient.get(key, (err, data) => {
    if (data) {
      res.send(JSON.parse(data));
    } else {
      next();
    }
  });
};

