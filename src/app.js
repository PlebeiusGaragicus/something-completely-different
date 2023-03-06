const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');

const session = require('express-session');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.use(session({
  secret: 'mysecret',
  resave: false,
  saveUninitialized: false
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
  // if (!req.session.num1) {
  //   req.session.num1 = 1;
  // }
  // if (!req.session.num2) {
  //   req.session.num2 = 2;
  // }
  // if (!req.session.operation) {
  //   req.session.operation = '+';
  // }
  // const num1 = Number(req.session.num1);
  // const num2 = Number(req.session.num2);
  const num1 = req.session.num1 || 1;
  const num2 = req.session.num2 || 2.5;
  const operation = req.session.operation || '+';

  res.render('index', { num1, num2, operation });
});




app.listen(3000, () => {
  console.log('Server started on port 3000');
});
