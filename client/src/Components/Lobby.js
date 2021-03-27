import React, {useState, useEffect} from 'react';
import { Redirect } from 'react-router-dom';
import { toast } from "react-toastify";
import io from 'socket.io-client';
import ColorCard from './ColorCard';
import Game from './Game';

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
	const [error, setError] = useState({});
	
	// Function for when this user first joins 
	useEffect(() => {

		if(location.state) {
			const {name, room} = location.state;

			socket = io(ENDPOINT, { transports : ['websocket'] });

			if(!room) {
				socket.emit('createRoom', ({room}) => {
					joinGame(name, room);
				});
			} else {
				joinGame(name, room);
			}
			
			return () => {
				socket.disconnect();
			}
		} else {
			setError("Please provide a name and room first");
			setErrorOccured(true);
		}

	}, [ENDPOINT, location.state]);
	
	// When other player joins (case where we are the first to join)
	useEffect(() => {

		if (location.state) {
			socket.on('joinPlayer', ({name}) => {
				setOtherPlayerName(name);
				setBtnClass('btn btn-primary mt-4');
				toast.success("😄 " + name + " joined the game!");
			});
		}
		
	}, [ENDPOINT, location.state]);
	
	// When startGame has been triggered
	useEffect(() => {

		if (location.state) {
			socket.on('startGame', () => {
				setStarted(true);
				toast.success("🎮 Game started!");
			});
		}

	}, [ENDPOINT, location.state]);
	
	//  When opponentLeft has been triggered
	useEffect(() => {

		if (location.state) {
			socket.on('opponentLeft', ({name}) => {
				setBtnClass('btn btn-primary mt-4 disabled');
				setOtherPlayerName('');
				toast.info("😢 " + name + " left the game");
			});
		}
		
	}, [ENDPOINT, location.state]);
	
	function joinGame(name, room) {

		setName(name);
		setRoom(room);

		socket.emit('join', {name, room}, ({joinError, color, users}) => {
			if(joinError) {
				
				setError(joinError);
				setErrorOccured(true);
				
			} else {

				setErrorOccured(false);
				setColor(color);

				// Takes care of the case where we are the second player to join
				if(users.length > 1) {
					setOtherPlayerName(users[0].name);
					setBtnClass('btn btn-primary mt-4');
				}

				toast.success("🎉 Welcome to the game " + name + "!");
			}
		});
		
	}
	
	// Starting the game as the current player
	function startGame() {
		socket.emit('startGame', {room});
	}

	if(errorOccured) {

		return <Redirect to = {{
					pathname: "/",
					state: {
						error
					}
				}}/>;
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
					started = {started}
				/>
			</div>
		</div>
	);
	
}