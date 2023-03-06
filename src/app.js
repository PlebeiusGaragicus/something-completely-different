const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');

// const redis = require('redis');
// const session = require('express-session');

// const RedisStore = require('connect-redis')(session);

// const sessionStore = new RedisStore({ client: redisClient });


// const redisClient = redis.createClient({
//   host: 'localhost',
//   port: 6379,
//   password: 'your-redis-password'
// });

import connectRedis from 'connect-redis';
import session from 'express-session';
const RedisStore = connectRedis(session);

 app.use(
        session({
            secret: 'secret',
            store: new RedisStore({host: '127.0.0.1', port: 6379}),
            resave: false,
            saveUninitialized: false
        })
    );


redisClient.on('error', (err) => {
  console.error('Redis error:', err);
});


const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');


// app.use(session({
//   secret: 'mysecret',
//   resave: false,
//   saveUninitialized: false
// }));
app.use(session({
  store: sessionStore,
  secret: 'your-session-secret',
  resave: false,
  saveUninitialized: true
}));


function performCalculation(num1, num2, operation) {
  let result;

  if (operation === '+') {
    result = num1 + num2;
  } else if (operation === '-') {
    result = num1 - num2;
  } else if (operation === '*') {
    result = num1 * num2;
  } else if (operation === '/') {
    result = num1 / num2;
  }

  return result;
}


app.post('/', (req, res) => {
  const num1 = Number(req.body.num1);
  const num2 = Number(req.body.num2);
  const operation = req.body.operation;
  const result = performCalculation(num1, num2, operation);

  req.session.num1 = num1;
  req.session.num2 = num2;
  req.session.operation = operation;

  res.render('index', { result, num1, num2, operation });
});



app.get('/', (req, res) => {
  const num1 = req.session.num1 || 1;
  const num2 = req.session.num2 || 2.5;
  const operation = req.session.operation || '+';

  res.render('index', { num1, num2, operation });
});



app.listen(3000, () => {
  console.log('Server started on port 3000');
});
