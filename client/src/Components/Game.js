import React, {useState, useEffect} from 'react';
import { toast } from "react-toastify";
import Board from './Board';
import Emoji from './Emoji';
import ResultModal from './ResultModal';

export default function Game({socket, color, name, room, otherPlayerName, started}) {

	let GRID_SIZE = 40;
	let SIZE = 19;
	
	const [currentColor, setCurrentColor] = useState(1); // Black always starts first
	const [board, setBoard] = useState([]);
	const [winnerColor, setWinnerColor] = useState(0);
	const [showResult, setShowResult] = useState(false);
	const [gameEnded, setGameEnded] = useState(false);
	const [opponentDisconnected, setOpponentDisconnected] = useState(false);
	const [disconnectedName, setDisconnectedName] = useState(false);
	
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
		
		if(socket) {

			socket.on('play', ({newBoard, newColor}) => {
				setBoard(newBoard);
				setCurrentColor(newColor);
			});

			socket.on('endGame', ({winningColor}) => {
				setWinnerColor(winningColor);
				setGameEnded(true);
				setShowResult(true);
			});

		}
		
	}, [board, currentColor, socket]);

	//  When opponentLeft has been triggered
	useEffect(() => {
		if (socket) {
			socket.on('opponentLeft', ({name}) => {
				if(!gameEnded && started) {
					setShowResult(true);
					setOpponentDisconnected(true);
					setDisconnectedName(name);
				}
			});
		}
	}, [socket, started, gameEnded]);

	// When current player plays a stone
	function play(i, j) {

		if(gameEnded || opponentDisconnected) {
			toast.error("😬 The game has ended!");
			return;
		}
		
		if(color !== currentColor) {
			toast.error("😬 It isn't your turn yet!");
			return;
		}
		
		if(board[i][j] !== 0) {
			toast.error("😬 That spot is taken!");
			return;
		}
		
		socket.emit('play', {i, j, board, color, room}, () => {});
		
	}

	return (
		<div className="container board-container mt-4">
			<h1> Gomoku Online </h1>
			<p> An online port of the classic game: <a className = "custom-link" href = "https://en.wikipedia.org/wiki/Gomoku" target = "_blank" rel="noopener noreferrer"> Gomoku </a> </p>
			<ResultModal 
				show = {showResult} 
				handleClose = {() => {setShowResult(false)}} 
				winnerColor = {winnerColor} 
				myColor = {color} 
				name = {name} 
				otherPlayerName = {otherPlayerName} 
				opponentDisconnected = {opponentDisconnected}
				disconnectedName = {disconnectedName}
			/>
			<div className = {winnerColor !== 0 ? "" : "hide-div"}>
				<p> {winnerColor === 1 ? "Black" : "White"} has won! </p>
				<a className = "btn btn-primary" href = "/">
	        		Join a New Game
		        </a>
			</div>
			<div className = {opponentDisconnected && !gameEnded ? "" : "hide-div"}>
				<p> {disconnectedName} has left the game. </p>
				<a className = "btn btn-primary" href = "/">
	        		Join a New Game
		        </a>
			</div>
			<p className = {gameEnded || opponentDisconnected ? "hide-div" : ""}> Current turn: {currentColor === 1 ? "Black" : "White"} ({currentColor === color ? name : otherPlayerName})</p>
			<Board board = {board} size = {SIZE} on_play = {play} grid_size = {GRID_SIZE}/>
			<p className = "my-4"> Made with <Emoji symbol="😎🍍"/>, React, and Bootstrap • © Sheena Cheng {new Date().getFullYear()} </p>
		</div>
	);
	
}