const rooms = [];
const crypto = require('crypto');

const createRoom = () => {

	const room = generateRoomCode();
	rooms.push(room);
	return room;

}

const removeRoom = (roomCode) => {

	const index = rooms.findIndex((room) => room === roomCode);

	if(index !== -1) {
		return rooms.splice(index, 1)[0];
	}
	
}

const getRoom = (roomCode) => {
	return rooms.find((room) => room === roomCode);
}

const generateRoomCode = () => {

	let code = crypto.randomBytes(3).toString('hex').toUpperCase();

	while(getRoom(code)) {
		code = crypto.randomBytes(3).toString('hex').toUpperCase();
	}
	
	return code;
}

module.exports = {createRoom, removeRoom, getRoom};