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

		// LET ALL users (including sender) in the room know that the game has started
		io.sockets.in(room).emit('startGame');

	});

	socket.on('play', ({i, j, board, color, room}) => {

		// Update the board
		let newBoard = [...board];
		newBoard[i][j] = color;

		// Update the color (switch the turn)
		let newColor = 0;
		if(color === 1) {
			newColor = 2;
		} else {
			newColor = 1;
		}

		// LET ALL users (including sender) in the room know about the play
		io.sockets.in(room).emit('play', {newBoard: newBoard, newColor: newColor});

		// If the game is now in a winning state, declare the winner (and let all users in the room know it)
		if(isWinningState(newBoard)) {
			io.sockets.in(room).emit('endGame', {winningColor: color});
		}
	});
	
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

