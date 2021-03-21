import React, {useState, useEffect} from 'react';
import Board from './Board';
import Emoji from './Emoji.js';
import '../App.css';

export default function Game({socket, color, room}) {

	let GRID_SIZE = 40;
	let SIZE = 19;
	
	const [currentColor, setCurrentColor] = useState(1); // Black always starts first
	const [board, setBoard] = useState([]);
	const [winner, setWinner] = useState('');
	
	// Initialize the local gameboard
	useEffect(() => {

		let matrix = [];

		for (let i = 0; i < SIZE; i++) {
			matrix[i] = [];
			for (let j = 0; j < SIZE; j++) {
				matrix[i][j] = 0;
			}
		}

		setBoard(matrix);

	}, [SIZE]);
	
	// Handles when a player plays the stone and updates the board & currentColor
	useEffect(() => {
		
		// The if is needed to prevent the "cannot call on for undefined" error
		if(typeof socket !== 'undefined') {

			socket.on('play', ({board, color}) => {
				setBoard(board);
				setCurrentColor(color);
			});

			socket.on('endGame', ({color}) => {
				
				if(color === 1) {
					setWinner("Black");
				} else {
					setWinner("White");
				}
				
			});
		}

	}, [board, currentColor, socket]);

	// When current player plays a stone
	function play(i, j) {

		if(winner !== '') {
			console.log("The game has ended!");
			return;
		}
		
		if(color !== currentColor) {
			console.log("It isn't your turn yet!");
			return;
		}
		
		if(board[i][j] !== 0) {
			console.log("that spot is taken!");
			return;
		}
		
		socket.emit('play', {i, j, board, color, room}, () => {});
		
	}

	// TODO - Handle declaring winner (winner modal)
	// TODO - Handle resetting the game
	
	return (
		<div className="container board-container mt-4">
			<h1> Gomoku Online </h1>
			<p> An online port of the classic game: <a className = "custom-link" href = "https://en.wikipedia.org/wiki/Gomoku" target = "_blank" rel="noopener noreferrer"> Gomoku </a> </p>
			<p> Room Code: {room} </p>
			<p> {winner ? winner + " has won!" : null} </p>
			<p> Current turn: {currentColor === 1 ? "Black" : "White"} </p>
			<Board board = {board} size = {SIZE} on_play = {play} grid_size = {GRID_SIZE}/>
			<p className = "my-4"> Made with <Emoji symbol="😎🍍"/>, React, and Bootstrap • © Sheena Cheng {new Date().getFullYear()} </p>
		</div>
	);
	
}