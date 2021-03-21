import React from 'react';
import BoardIntersection from './BoardIntersection';

export default function Board(props) {

	const style = {
		width: props.size * props.grid_size,
		height: props.size * props.grid_size
	};
	
	let intersections = [];

	for(let i = 0; i < props.size; i++) {
		for (let j = 0; j < props.size; j++) {
			intersections.push(BoardIntersection({
				board: props.board,
				row: i,
				col: j,
				color: props.board[i] ? props.board[i][j] : 0,
				play: props.on_play,
				grid_size: props.grid_size
			}));
		}
	}
	
	return (
		<div style = {style} id = "board">{intersections}</div>
	);
}