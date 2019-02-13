const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

var count = 0;

const documents = {};
io.on("connection", socket => {
	count++;
	console.log('Total connect: ' + count);

	socket.on('join', function(userName) {
		console.log('User come is: ' + userName);
		io.emit('userCome', userName);
	});

	socket.on('sendMessage', function(object) {
		console.log('Message: ' + object.message + '-' + object.userName);
		io.emit('message', object);
	});

	// Event disconnect
	socket.on('disconnect', function(userName) {
		count--;
		console.log('User leave: ' + userName);
	});
});

http.listen(44444, function(){
  console.log('Socket.IO listening on port : 44444 ' + Date());
});