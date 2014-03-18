
var io = require('socket.io');
var createChat = function(app) {
  io = io.listen(app);

  //actual socket io api
  // console.log(io);
  var users = 0

  io.sockets.on('connection', function (socket) {
    users++
    socket.user = users
    console.log("someone connected")
    socket.emit('news', { hello: 'telling' });
    socket.on('secret', function (data) {
    if (data.match(/^\/nick.*/)){
        socket.user = data.slice(5)
    } else {
      io.sockets.emit('message', { message: data, user: socket.user } )
    }
    });
  });


}

exports.createChat = createChat;


