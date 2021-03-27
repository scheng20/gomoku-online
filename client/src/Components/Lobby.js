import React, {useState, useEffect} from 'react';
import { Redirect } from 'react-router-dom';
import queryString from 'query-string';
import io from 'socket.io-client';
import ColorCard from './ColorCard';
import Game from './Game';
import '../App.css';

let socket;

export default function Lobby({location}) {

	const ENDPOINT = 'localhost:5000';
	const [name, setName] = useState('');
	const [room, setRoom] = useState('');
	const [color, setColor] = useState(0);
	const [otherPlayerName, setOtherPlayerName] = useState('');
	const [btnClass, setBtnClass] = useState('btn btn-primary disabled mt-4');
	const [started, setStarted] = useState(false);
	const [errorOccured, setErrorOccured] = useState(false);
	const [joinError, setJoinError] = useState("haha sad");

	// Function for when this user first joins 
	useEffect(() => {

		// TODO - handle case for automatically assigning a room to a user (under the create room case)
		
		const {name, room} = queryString.parse(location.search);

		socket = io(ENDPOINT, { transports : ['websocket'] });

		setName(name);
		setRoom(room);
		
		socket.emit('join', {name, room}, ({error, color, users}) => {
			if(error) {
				
				setJoinError(error);
				setErrorOccured(true);
				
			} else {

				setErrorOccured(false);
				setColor(color);

				// Takes care of the case where we are the second player to join
				if(users.length > 1) {
					setOtherPlayerName(users[0].name);
					setBtnClass('btn btn-primary mt-4');
				}
			}
		});
		
		return () => {
			//socket.emit('disconnect'); // commented this out to avoid the "disconnect is a reserved name" issue
			socket.off();
		}
		
	}, [ENDPOINT, location.search]);

	// When other player joins (case where we are the first to join)
	useEffect(() => {
		socket.on('joinPlayer', ({name}) => {
			setOtherPlayerName(name);
			setBtnClass('btn btn-primary mt-4');
		});
	}, [otherPlayerName])

	// When startGame has been triggered
	useEffect(() => {
		socket.on('startGame', () => {
			setStarted(true);
		});
	}, [started]);

	//  When opponentLeft has been triggered
	useEffect(() => {
		socket.on('opponentLeft', ({name}) => {
			setBtnClass('btn btn-primary mt-4 disabled');
			setOtherPlayerName('');			
		});
	}, [otherPlayerName]);
	
	// Starting the game as the current player
	function startGame() {
		socket.emit('startGame', {room});
	}
	
	return (
		<div className = "container text-center mt-4">
			{errorOccured ? 
				<Redirect to = {{
					pathname: "/",
					state: {
						error: joinError
					}
				}}/>
				: null}
			<div className = {started ? "hide-div" : ""}>
				<h1> Gomoku Online </h1>
				<p> Room Code: {room} </p>
				<div className = "row mt-4">
					<div className = "col">
						<ColorCard color = "Black" player = {color === 1 ? name : otherPlayerName} />
					</div>
					<div className = "col">
						<ColorCard color = "White" player = {color === 2 ? name : otherPlayerName} />
					</div>
				</div>
				<button className = {btnClass} type = "submit" onClick = {startGame} >Start</button>
			</div>
			<div className = {started ? "" : "hide-div"}>
				<Game 
					socket = {socket} 
					color = {color} 
					name = {name} 
					room = {room} 
					otherPlayerName = {otherPlayerName}
					started = {started}
				/>
			</div>
		</div>
	);
	
}