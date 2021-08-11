var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors')
var server = require('http').createServer(app);  
var io = require('socket.io')(server, {});

mongoose.connect('mongodb://localhost:27017/chatdb', { useNewUrlParser: true, useUnifiedTopology: true });

let countUserOnline = 1
io.on('ceonnetctio', socket => {
    socket.on('join', param => {
        console.log('user join')
        countUserOnline++;
        io.emit('countUserOnline', countUserOnline)
    })
    socket.on('message', param => {
        console.log('user mengirim pesan')
        io.emit(param)
    })
    socket.on('disconnect', param => {
        console.log('user keluar')
        countUserOnline--;
        io.emit('countUserOnline', countUserOnline)
    })
})
server.listen(3010);

var indexRouter = require('./routes/index');
var chatsRouter = require('./routes/chats');
var authRouter = require('./routes/auth');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())

app.use('/', indexRouter);
app.use('/api/chats', chatsRouter);
app.use('/api/users', authRouter);

module.exports = app;
