// Color Legend:
// black = 1
// white = 2

const users = [];

const addUser = ({id, name, room}) => {

	name = name.trim();
	let color = 0;
	
	const existingUser = users.find((user) => user.room === room && user.name === name);

	if(getUsersInRoom(room).length === 2) {
		return {error: 'Room is full, please join another room or create a new room'};
	}
	
	if(existingUser) {
		return {error: 'Username is taken, please choose a different name'};
	}
	
	if(getUsersInRoom(room).length === 0) {
		color = 1;
	} else {
		
		let otherPlayerColor = getUsersInRoom(room)[0].color;

		if(otherPlayerColor === 1) {
			color = 2;
		} else {
			color = 1;
		}
		
	}

	const user = {id, name, room, color};

	users.push(user);

	return { user };

}

const removeUser = (id) => {
	const index = users.findIndex((user) => user.id === id);

	if(index !== -1) {
		return users.splice(index, 1)[0];
	}
}

const getUser = (id) => {
	return users.find((user) => user.id === id);
}

const getUsersInRoom = (room) => {
	return users.filter((user) => user.room === room);
}

module.exports = {addUser, removeUser, getUser, getUsersInRoom};