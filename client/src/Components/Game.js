import React, {useState} from 'react';
import GomokuGame from '../Game/Gomoku.js';
import Board from './Board';
import Emoji from './Emoji.js';
import '../App.css';

let game = new GomokuGame(19);
let GRID_SIZE = 40;

export default function Game(props) {

	const [color, setColor] = useState(game.currentColor);
	
	let socket = props.socket;

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