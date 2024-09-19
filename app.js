// const createError = require('http-errors');
// const express = require('express');
// const path = require('path');
// const cookieParser = require('cookie-parser');
// const logger = require('morgan');

import createHttpError from 'http-errors';
import express from 'express'
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import path from 'path';
import bodyParser from "body-parser"

// const indexRouter = require('./routes/index');
// const usersRouter = require('./routes/users');

// import router from './routes/index.js'
import indexRouter from './routes/index.js'
import movie from './routes/movie.js'

const app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/movie', movie);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// module.exports = app;
export default app; // export the app