import './App.css';
import React, {useState} from 'react';
import GomokuGame from './Game/Gomoku.js';
import Board from './Components/Board';
import Emoji from './Components/Emoji.js'

let game = new GomokuGame(19);
let GRID_SIZE = 40;

function App() {

	// TODO - Fix up game.currentColor not working (figure out why)
	
	//const[color, setColor] = useState(game.currentColor);

	function play(i, j) {
		let result = game.play(i, j);
		//setColor(game.currentColor);
		return result;
	}
	
	return (
		<div className="App">
			<div className="container board-container mt-4">
				<h1> Gomoku Online </h1>
				<p> An online port of the classic game: <a className = "custom-link" href = "https://en.wikipedia.org/wiki/Gomoku" target = "_blank" rel="noopener noreferrer"> Gomoku </a> </p>
				<p> Current turn: {game.currentColor === 1 ? "Black" : "White"} </p>
				<Board board = {game.board} size = {game.size} on_play = {play} grid_size = {GRID_SIZE} color = {game.currentColor} />
				<p className = "my-4"> Made with <Emoji symbol="😎🍍"/>, React, and Bootstrap • © Sheena Cheng {new Date().getFullYear()} </p>
			</div>
		</div>
	);
}

export default App;
