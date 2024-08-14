
require('dotenv').config()
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const mongoose = require('mongoose');

mongoose.connect(process.env.DB_DELOY)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

const cors = require('cors');
app.use(cors());
//routes
const categoryRoutes = require('./routes/categories');
const productRoutes = require('./routes/products');
const orderRoutes = require('./routes/orders');
const usersRouters = require('./routes/users')
app.use('/api/users', usersRouters)
app.use('/api/oders', orderRoutes)
app.use('/api/category', categoryRoutes);
app.use('/api/products', productRoutes);

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;

