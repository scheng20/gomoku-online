import React, {useState, useEffect} from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';
import GomokuGame from '../Game/Gomoku.js';
import Board from './Board';
import Emoji from './Emoji.js';
import '../App.css';

let game = new GomokuGame(19);
let GRID_SIZE = 40;
let socket;

export default function Game({location}) {

	const ENDPOINT = 'localhost:5000';
	const [name, setName] = useState('');
	const [room, setRoom] = useState('');
	const [color, setColor] = useState(game.currentColor);

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

	function play(i, j) {
		
		let result = game.play(i, j);

		if(game.ended) {
			setColor(0);
		} else {
			setColor(game.currentColor);
		}
		
		return result;
	}
	
	return (
		<div className="container board-container mt-4">
			<h1> Gomoku Online </h1>
			<p> An online port of the classic game: <a className = "custom-link" href = "https://en.wikipedia.org/wiki/Gomoku" target = "_blank" rel="noopener noreferrer"> Gomoku </a> </p>
			<p> Current turn: {game.currentColor === 1 ? "Black" : "White"} </p>
			<Board board = {game.board} size = {game.size} on_play = {play} grid_size = {GRID_SIZE} color = {color} />
			<p className = "my-4"> Made with <Emoji symbol="😎🍍"/>, React, and Bootstrap • © Sheena Cheng {new Date().getFullYear()} </p>
		</div>
	);
	
}