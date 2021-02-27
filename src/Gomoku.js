/*
 * Gomoku.js - Game logic for the board game Gomoku
 */

let STONE_EMPTY = 0;
let STONE_BLACK = 1;
let STONE_WHITE = 2;

export default class GomokuGame {

	constructor(size) {
		this.currentColor = STONE_BLACK;
		this.size = size;
		this.board = this.createBoard(size);
	}

	// Returns a matrix representing an empty game board
	createBoard(size) {
		let matrix = [];
		for (let i = 0; i < size; i++) {
			matrix[i] = [];
			for (let j = 0; j < size; j++) {
				matrix[i][j] = STONE_EMPTY;
			}
		}

		return matrix;
	}

	// Switches the turn
	switchPlayer() {
		if (this.currentColor == STONE_BLACK) {
			this.currentColor = STONE_WHITE;
		} else {
			this.currentColor = STONE_BLACK;
		}
	}

	// Ends the game and displays a winner message (if any)
	endGame(winner) {

		if (winner !== "none") {
			alert({winner} + "WON!");
		} else {
			alert ("DRAW GAME");
		}

	}

	// Returns true if the game is in a draw, false otherwise
	detectDraw() {

		for (let i = 0; i < this.size; i++) {
			for (let j = 0; j < this.size; j++) {
				if (this.board[i][j] == 0) {
					return false;
				}
			}
		}

		return true; 
	}

	// Attempts to play a stone at position i, j
	play(i, j) {
		// TODO
	}

}