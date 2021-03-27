import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import '../App.css';

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
		<div className = "container text-center mt-4">
			<ToastContainer 
				closeOnClick={false}
			/>
			<h1> Gomoku Online </h1>
			<div className = {createRoom ? "hide-div" : "mt-4"}>
				<div><input placeholder = "Player Name" className = "form-control" type = "text" onChange = {(event) => setName(event.target.value)} /></div>
				<div><input placeholder = "Room Code" className = "form-control mt-2" type = "text" onChange = {(event) => setRoom(event.target.value)} /></div>
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
				<button onClick = {() => setCreateRoom(true)}> No room code? Create a new game here! </button>
			</div>
			<div className = {createRoom ? "mt-4" : "hide-div"} >
				<div><input placeholder = "Player Name" className = "form-control" type = "text" onChange = {(event) => setName(event.target.value)} /></div>
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
			</div>
		</div>
	);
	
}