import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { toast } from "react-toastify";

export default function Join({location}) {

	const [name, setName] = useState('');
	const [room, setRoom] = useState('');
	const [createRoom, setCreateRoom] = useState(false);
	
	useEffect(() => {

		if(location && location.state && location.state.error) {
			const error = location.state.error;
			toast.error("😬 " + error);
		}
		
	}, [location]);
	
	return (
		<div className = "join-outer-container animated-background">
			<div className = "join-inner-container">
				<h1 className = "join-header"> Gomoku Online </h1>
				<div className = {createRoom ? "hide-div" : "join-div"}>
					<div><input placeholder = "Player Name" className = "form-control join-input" type = "text" onChange = {(event) => setName(event.target.value)} /></div>
					<div><input placeholder = "Room Code" className = "form-control join-input mt-2" type = "text" onChange = {(event) => setRoom(event.target.value)} /></div>
					<Link 
						onClick = {event => (!name || !room) ? event.preventDefault() : null} 
						to = {{
							pathname: '/game',
							state: {
								name,
								room
							}
						}}
					>
						<button className = "btn btn-primary mt-4 mb-4" type = "submit">Join Game</button>
					</Link>
					<div className = "mb-4">
						<p className = "link-text"> No room code? </p>
						<button className = "link" onClick = {() => setCreateRoom(true)}> Create a new game here! </button>
					</div>
				</div>
				<div className = {createRoom ? "join-div" : "hide-div"} >
					<div><input placeholder = "Player Name" className = "form-control join-input" type = "text" onChange = {(event) => setName(event.target.value)} /></div>
					<Link
						onClick = {event => !name ? event.preventDefault() : null}
						to = {{
							pathname: '/game',
							state: {
								name
							}
						}}
					>
						<button className = "btn btn-primary mt-4 mb-4" type = "submit">Create Game</button>
					</Link>
					<div className = "mb-4">
						<p className = "link-text"> Got a room code? </p>
						<button className = "link" onClick = {() => setCreateRoom(false)}> Join a game here! </button>
					</div>
				</div>
			</div>
		</div>
	);
	
}