(function(root){
  var CA = root.CA = (root.CA || {})

  var Chat = CA.Chat = function (socket) {
    this.socket = socket
  }


  Chat.prototype.sendMessage = function(message) {
    this.socket.emit(message);
  }

})(this);