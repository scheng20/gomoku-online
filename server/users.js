const users = [];

const addUser = ({id, name, room}) => {

	name = name.trim().toLowerCase();
	room = room.trim().toLowerCase();
	let color = '';

	const existingUser = users.find((user) => user.room === room && user.name === name);

	if(existingUser) {
		return {error: 'Username is taken'}
	}

	if(getUsersInRoom(room).length >= 2) {
		return {error: 'Room is full'}
	}

	if(getUsersInRoom(room).length === 0) {
		color = 'black';
	} else {
		color = 'white';
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