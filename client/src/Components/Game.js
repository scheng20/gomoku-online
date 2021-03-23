import React, {useState, useEffect} from 'react';
import Board from './Board';
import Emoji from './Emoji';
import ResultModal from './ResultModal';
import '../App.css';

export default function Game({socket, color, name, room, otherPlayerName}) {

	let GRID_SIZE = 40;
	let SIZE = 19;
	
	const [currentColor, setCurrentColor] = useState(1); // Black always starts first
	const [board, setBoard] = useState([]);
	const [winnerColor, setWinnerColor] = useState(0);
	const [showResult, setShowResult] = useState(false);
	
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
		
		// The if is needed to prevent the "cannot call .on for undefined" error
		if(typeof socket !== 'undefined') {

			socket.on('play', ({newBoard, newColor}) => {
				setBoard(newBoard);
				setCurrentColor(newColor);
			});

			socket.on('endGame', ({winningColor}) => {
				setWinnerColor(winningColor);
				setShowResult(true);
			});
		}

	}, [board, currentColor, socket]);

	// When current player plays a stone
	function play(i, j) {

		if(winnerColor !== 0) {
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

	return (
		<div className="container board-container mt-4">
			<h1> Gomoku Online </h1>
			<p> An online port of the classic game: <a className = "custom-link" href = "https://en.wikipedia.org/wiki/Gomoku" target = "_blank" rel="noopener noreferrer"> Gomoku </a> </p>
			<ResultModal show = {showResult} handleClose = {() => {setShowResult(false)}} winnerColor = {winnerColor} myColor = {color} name = {name} otherPlayerName = {otherPlayerName} />
			<div className = {winnerColor === 0 ? "hide-div" : ""}>
				<p> {winnerColor === 1 ? "Black has won!" : "White has won!"} </p>
				<a className = "btn btn-primary" href = "/">
	        		Join a New Game
		        </a>
			</div>
			<p className = {winnerColor !== 0 ? "hide-div" : ""}> Current turn: {currentColor === 1 ? "Black" : "White"} ({currentColor === color ? name : otherPlayerName})</p>
			<Board board = {board} size = {SIZE} on_play = {play} grid_size = {GRID_SIZE}/>
			<p className = "my-4"> Made with <Emoji symbol="😎🍍"/>, React, and Bootstrap • © Sheena Cheng {new Date().getFullYear()} </p>
		</div>
	);
	
}