import express from 'express';
import createHttpError from 'http-errors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import path from 'path';

// Import your routes
import indexRouter from './routes/index.js';
import movie from './routes/movie.js';
import director from './routes/director.js';
import mongoose from 'mongoose';
import verifyToken from './middle-ware/verify-token.js';

//Config
// import { api_secret_key } from './config.js'

const app = express();

// app.set('api_secret_key', api_secret_key);

mongoose.connect('mongodb://localhost:27017/test')
  .then(() => {
    console.log('connect to server!')
  })
  .catch((err) => {
    console.log(err, 'cant connect!')
  })

// view engine setup
app.set('view engine', 'jade');


app.use(morgan('dev'));
app.use(express.json()); // Use the built-in body parser for JSON
app.use(express.urlencoded({ extended: true })); // Use the built-in parser for URL-encoded data
app.use(cookieParser());

// Set up routes
app.use('/', indexRouter);
app.use('/api/', verifyToken)
app.use('/api/movies', movie);
app.use('/api/director', director);



// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createHttpError(404));
});

// error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.json({ error: { message: err.message, code: err.code } });
});

export default app;
