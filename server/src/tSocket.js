var io = undefined;

module.exports.init = function(server){
  if(!io){
    console.log('Initializing new socket');
    io = require('socket.io')(server);
  }else{
    throw 'Io already initialized'
  }
};
module.exports.getIo = function(){
  if(!io){
    throw 'Io not initialized'
  }
  return io;
}
