const redis = require('redis');

const keys = require('./keys.js');
const fib = require('./fib.js');

const redisClient = redis.createClient({
  host: keys.redisHost,
  port: keys.redisPort,
  retry_strategy: () => 1000
});

const sub = redisClient.duplicate();

sub.on('message', (_channel, message) => {
  redisClient.hset('values', message, fib(parseInt(message)))
});

sub.subscribe('insert');