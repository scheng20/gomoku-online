import './App.css';
import React, {useState} from 'react';
import GomokuGame from './Game/Gomoku.js';
import Board from './Components/Board';

let game = new GomokuGame(19);
let GRID_SIZE = 40;

function App() {

	const[color, setColor] = useState(game.currentColor);

	function play(i, j) {
		let result = game.play(i, j);
		setColor(game.currentColor);
		return result;
	}
	
	return (
		<div className="App">
			<div className="container board-container mt-4">
				<h1> Gomoku Online </h1>
				<p> An online port of the classic game: Gomoku </p>
				<p> Current turn: {color === 1 ? "Black" : "White"} </p>
				<Board board = {game.board} size = {game.size} on_play = {play} grid_size = {GRID_SIZE} color = {color} />
			</div>
		</div>
	);
}

export default App;
