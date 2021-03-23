import React, {useState, useEffect} from 'react';
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
	const [opponentDisconnected, setOpponentDisconnected] = useState(false);
	
	// Function for when this user first joins 
	useEffect(() => {

		// TODO - handle case for automatically assigning a room to a user
		
		const {name, room} = queryString.parse(location.search);

		socket = io(ENDPOINT, { transports : ['websocket'] });

		setName(name);
		setRoom(room);
		
		socket.emit('join', {name, room}, ({error, color, users}) => {
			if(error) {

				// TODO - handle case of where player joins a room that's already full
				console.log(error);

			} else {
				setColor(color);

				// Takes care of the case where we are the second player to join
				if(users.length > 1) {
					setOtherPlayerName(users[0].name);
					setBtnClass('btn btn-primary mt-4');
				}
			}
		});
		
		return () => {
			socket.emit('disconnect');
			socket.off();
		}
		
	}, [ENDPOINT, location.search]);

	// When other player joins (case where we are the first to join)
	useEffect(() => {
		socket.on('joinPlayer', ({name}) => {
			setOpponentDisconnected(false);
			setOtherPlayerName(name);
			setBtnClass('btn btn-primary mt-4');
		});
	}, [otherPlayerName])

	// When startGame has been triggered
	useEffect(() => {
		socket.on('startGame', () => {
			setStarted(true);
			console.log(started);
		});
	});

	//  When opponentLeft has been triggered
	useEffect(() => {
		socket.on('opponentLeft', () => {

			setOpponentDisconnected(true);
			setBtnClass('btn btn-primary mt-4 disabled');

			// TODO - This should prevent the opponent name being erased if the game has already started but 
			//        I'm not too sure why it's not working :/ it seems like started is always false
			//        for some reason
			
			if(!started) {
				console.log(started);
				setOtherPlayerName('');
				console.log('cleared name');
			}

		});
	}, [started]);
	
	// Starting the game as the current player
	function startGame() {
		socket.emit('startGame', {room});
	}

	return (
		<div className = "container text-center mt-4">
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
					opponentDisconnected = {opponentDisconnected} 
					gameStarted = {started}
				/>
			</div>
		</div>
	);
	
}