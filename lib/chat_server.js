
var io = require('socket.io');
var createChat = function(app) {
  io = io.listen(app);

  //actual socket io api
  // console.log(io);
  var users = {};

  io.sockets.on('connection', function (socket) {
    users[socket.id] = "Guest" + Object.keys(users).length
    socket.user = users[socket.id]
    console.log(users)
    socket.emit('news', { hello: 'telling' });
    socket.on('secret', function (data) {
    if (data.match(/^\/nick.*/)){
      var newName = data.slice(5)

        var data = "User " + socket.user + " has changed their nickname to: " + newName
        users[socket.id] = newName
        io.sockets.emit('message', {message: data, user: "System", users: users})
    } else {
      io.sockets.emit('message', { message: data, user: users[socket.id], users: users} )
    }

    socket.on('disconnect', function(data) {
      var _currentUser = users[socket.id];

      if (_currentUser && delete users[socket.id]){
        io.sockets.emit('message', { message: _currentUser + " has left.", user: "System",
            users: users})
      }
    });

    });
  });


}

exports.createChat = createChat;


