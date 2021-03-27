import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import '../App.css';

export default function Join({location}) {

	const [name, setName] = useState('');
	const [room, setRoom] = useState('');

	useEffect(() => {

		if(location && location.state && location.state.error) {
			const error = location.state.error;
			toast.error("😬 " + error);
		}
		
	}, [location]);
	
	return (
		<div className = "container text-center mt-4">
			<ToastContainer 
				closeOnClick={false}
			/>
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