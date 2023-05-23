const express = require('express');
const path = require('path');
const morgan = require('morgan');
const userRouter = require('./routes/userRoutes');
const rateLimit = require('express-rate-limit')
const helmet = require('helmet')
const mongoSanitize = require('express-mongo-sanitize')
const hpp = require('hpp')
const globalErrorHandler = require('./controllers/errorController');
const AppError = require('./utils/appError');
const app = express();
const bodyParser = require('body-parser');
const sanitizeHtml = require('sanitize-html');
app.use(express.json({ limit: '10kb' }));
function checkForHTMLTags(req, res, next) {
  const { body } = req;
  const keys = Object.keys(body);

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const value = body[key];

    if (typeof value === 'string' && sanitizeHtml(value) !== value) {
      return res.status(400).json({ error: 'HTML tags are not allowed in the request body' });
    }
  }
  next();
}
app.use(checkForHTMLTags);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(helmet())
app.use(mongoSanitize())
app.use(hpp({
  whitelist: [
    '',
    ''
  ]
}))
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 100,
  message: 'To many request from this IP now please wait for an hour!'
})

app.use('/uploads/profile', express.static(path.join('uploads', 'profile')));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE')
  next();
});

app.use('/api', limiter)
app.use(express.json({ limit: '10kb' }));
app.use(express.static(`${__dirname}/public`))
app.use('/api/v1/users', userRouter);
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404))
})
app.use(globalErrorHandler)

module.exports = app;




