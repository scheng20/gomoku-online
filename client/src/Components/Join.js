import React, {useState} from 'react';
import { Link } from 'react-router-dom';

export default function Join() {

	const [name, setName] = useState('');
	const [room, setRoom] = useState('');

	return (
		<div className = "container text-center mt-4">
			<h1> Gomoku Online </h1>
			<div className = "mt-4">
				<div><input placeholder = "Name" className = "form-control" type = "text" onChange = {(event) => setName(event.target.value)} /></div>
				<div><input placeholder = "Room" className = "form-control mt-2" type = "text" onChange = {(event) => setRoom(event.target.value)} /></div>
				<Link onClick = {event => (!name || !room) ? event.preventDefault() : null} to={`/game?name=${name}&room=${room}`}>
					<button className = "btn btn-primary mt-4" type = "submit">Join Game</button>
				</Link>
			</div>
		</div>
	);
	
}