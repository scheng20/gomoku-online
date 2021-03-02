/*
 * Gomoku.js - Game logic for the board game Gomoku
 */

const Gomoku = require('./Main');

let STONE_EMPTY = 0;
let STONE_BLACK = 1;
let STONE_WHITE = 2;

export default class GomokuGame {

	constructor(size) {
		this.currentColor = STONE_BLACK;
		this.size = size;
		this.board = this.createBoard(size);
		this.game = new Gomoku(5, size, size);
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

		if (this.currentColor === STONE_BLACK) {
			this.currentColor = STONE_WHITE;
		} else {
			this.currentColor = STONE_BLACK;
		}

		console.log("SWITCH! The currentColor is now: " + this.currentColor);
	}

	// Ends the game and displays a winner message (if any)
	endGame(winner) {

		if (winner === 1) {
			alert("BLACK WON!");
		} else if (winner === 2) {
			alert("WHITE WON!");
		} else {
			alert("DRAW GAME");
		}

	}

	// Returns true if the game is in a draw, false otherwise
	// TODO - Make this more efficient, perhaps keep track of 
	// the total number of stones played and if that equals
	// the total number of squares then it's a draw
	/*
	detectDraw() {

		for (let i = 0; i < this.size; i++) {
			for (let j = 0; j < this.size; j++) {
				if (this.board[i][j] == 0) {
					return false;
				}
			}
		}

		return true; 
	}*/

	// Attempts to play a stone at position i, j
	play(i, j) {

		try {
			
			console.log(this.currentColor + " is playing at " + i + ", " + j);
			
			let result = this.game.setChessOf(this.currentColor, i, j);
			
			this.board[i][j] = this.currentColor;
			this.switchPlayer();

			if(result !== null && typeof result !== 'undefined') {
				this.endGame(result);
			}

		} catch (error) {
			
			if (error instanceof ReferenceError) {
				console.log("That space has been taken!");
			} else {
				console.log("An error occured:");
				console.error(error)
			}
		}
	}

}