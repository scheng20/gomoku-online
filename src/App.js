import './App.css';
import React, {useState} from 'react';
import GomokuGame from './Game/Gomoku.js';
import Board from './Components/Board';

let game = new GomokuGame(19);
let GRID_SIZE = 40;

function App() {
	
	function play(i, j) {
		return game.play(i, j);
	}
	
	return (
		<div className="App">
			<h1> Gomoku Online </h1>
			<p> An online port of the classic game: Gomoku </p>
			<p> Current color: {game.currentColor} </p>
			<Board board = {game.board} size = {game.size} on_play = {play} grid_size = {GRID_SIZE} color = {game.currentColor} />
		</div>
	);
}

export default App;
