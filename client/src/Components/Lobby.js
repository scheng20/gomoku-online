import React, {useState, useEffect} from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';
import '../App.css';

let socket;

export default function Lobby({location}) {

	const ENDPOINT = 'localhost:5000';
	const [name, setName] = useState('');
	const [room, setRoom] = useState('');

	useEffect(() => {

		const {name, room} = queryString.parse(location.search);

		socket = io(ENDPOINT, { transports : ['websocket'] });

		setName(name);
		setRoom(room);
		
		socket.emit('join', {name, room}, () => {});

		return () => {
			socket.emit('disconnect');
			socket.off();
		}
		
	}, [ENDPOINT, location.search]);

	return (
		<div className = "container text-center mt-4">
			<h1> Gomoku Online </h1>
			<p className = "mt-4"> Room: {room} </p>
			<div className = "row mt-4">
				<div className = "col">
					<button className = "btn btn-primary"> Play as Black </button>
				</div>
				<div className = "col">
					<button className = "btn btn-primary"> Play as White </button>
				</div>
			</div>
			<button className = "btn btn-primary disabled mt-4"> Start </button>
		</div>
	);
	
}