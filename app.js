var createError = require('http-errors');
var express = require('express');
const mongoose = require('mongoose');
require("dotenv").config();
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var carShopRouter = require('./routes/carShop');
var productosRouter = require('./routes/productos');
var ventasRouter = require('./routes/ventas');
var clientesRouter = require('./routes/clientes');

const cors = require('cors');
var app = express();

app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use('/carshop', carShopRouter);
app.use('/productos', productosRouter);
app.use('/ventas', ventasRouter);
app.use('/clientes', clientesRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

mongoose.connect(process.env.MONGODB_URI,
  { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (!err) { console.log('MongoDB connection succeeded.') }
    else { console.log('Error in DB connection : ' + err) }
  });

module.exports = app;
