import redis from "redis";
const redisConnection = redis.createClient({
  url: process.env.REDIS_URL,
});

export default redisConnection;
