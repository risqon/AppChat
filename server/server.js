// import { createServer } from "http";
// import { Server } from "socket.io";

// const httpServer = createServer();
// const io = new Server(httpServer, {
//   // ...
// });

// io.on("connection", (socket) => {
//   console.log('a user connected', socket.id);
//   socket.on('newChat',(data) => {
//     socket.broadcast.emit('newChat', data);
//   });
//   socket.on('delete-backEnd', function (id) {
//     console.log(id)
//     socket.broadcast.emit('delete-frontEnd', id);
//   })
// });

// httpServer.listen(3000);