const express = require('express');
const app = express();
const socket = require('socket.io')

const expressSession = require('express-session');
const path = require('path')
const passport = require('passport')
const UserRouter = require('./src/routes/users')
const users = require('./src/Models/usermodel')
const messageRouter = require('./src/routes/Message')

require('dotenv').config();
// database configuration
require('./src/config/db')
// set the view engine to ejs
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//set static file
app.use(express.static(path.join(__dirname, 'public')));
//passport session
app.use(expressSession({
    secret : 'popo',
    saveUninitialized:false,
    resave : false
  }));
  app.use(passport.initialize());
  app.use(passport.session());
  passport.serializeUser(users.serializeUser());
  passport.deserializeUser(users.deserializeUser());
//  bodyparser configuration

app.use(express.json());
app.use(express.urlencoded({extended:true}));

// route configuration
app.use('/',UserRouter)
app.use('/msg',messageRouter)

const server = app.listen(process.env.PORT,console.log(`server running on PORT ${process.env.PORT}`));
// var server = express.createServer();
// var io = require('socket.io')(server);
// global.io = io;
// require('./socket')(io)
const io = socket(server);
global.io = io
require('./socket')
