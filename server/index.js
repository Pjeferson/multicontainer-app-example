const express = require('express');
const cors = require('cors');
const redis = require('redis');
const { Pool } = require('pg');

const keys = require('./keys.js');

const app = express();

app.use(cors());
app.use(express.json());

// Fast server database setup
const pgClient = new Pool({
  host: keys.pgHost,
  port: keys.pgPort,
  database: keys.pgDatabase,
  user: keys.pgUser,
  password: keys.pgPassword
});

pgClient.on('error', () => console.log('Lost PG connection!'));

pgClient
  .query('CREATE TABLE IF NOT EXISTS values (number INT)')
  .catch(err => console.log(err));

// Fast server redis setup
const redisClient = redis.createClient({
  host: keys.redisHost,
  port: keys.redisPort,
  retry_strategy: () => 1000
});

const redisPublisher = redisClient.duplicate();

// Server route handlers
app.get('/', (_req, res) => {
  res.send('Hello, world!');
});

app.get('/values/all', async (_req, res) => {
  const values = await pgClient.query('SELECT * FROM values');

  res.send(values.rows);
});

app.get('/values/current', async (_req, res) => {
  redisClient.hgetall('values', (_err, values) => {
    res.send(values);
  });
});

app.post('/values', async (req, res) => {
  const index = req.body.index;

  if (parseInt(index) > 40) {
    return res.status(422).send('Index too high');
  }

  redisClient.hset('values', index, 'Nothing yet :/');
  redisPublisher.publish('insert', index);

  pgClient.query('INSERT INTO values(number) VALUES($1)', [index]);

  res.send({
    calculating: true
  });
});

app.listen(5000, _err => console.log('Listening...'));