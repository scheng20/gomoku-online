const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const { addUser, removeUser, getUser, getUsersInRoom } = require('./users.js');
const { isWinningState } = require('./game.js');

const PORT = process.env.PORT || 5000;

const router = require('./router');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

io.on('connection', (socket) => {

	console.log('We have a new connection!');

	socket.on('join', ({name, room}, callback) => {

		const {error, user} = addUser({id: socket.id, name, room});

		if(error) {
			return callback({error});
		}

		// Let existing users in the room know that you've joined
		socket.broadcast.to(user.room).emit('joinPlayer', {name: user.name}); 

		socket.join(user.room);

		callback({color: user.color, users: getUsersInRoom(room)});

	});

	socket.on('startGame', ({room}) => {

		// let all other users in the room know that the game has started
		socket.broadcast.to(room).emit('startGame');

	})
	
	socket.on('disconnect', () => {
		console.log('User has left.');
		const user = removeUser(socket.id);
		
		// TODO - handle case where user leaves the room (aka end game or reset lobby)
		
	});
});

app.use(router);

server.listen(PORT, () => {
	console.log(`Server has started on port ${PORT}`);
});

