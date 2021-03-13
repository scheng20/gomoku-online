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
		this.stones_played = 0;
		this.ended = false;
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
		
	}

	// Ends the game and displays a winner message
	endGame(draw) {

		if(draw) {
			alert("Game has ended in a draw!");
			return;
		}

		if (this.currentColor === STONE_BLACK) {
			alert("BLACK WON! Play again?");
		} else if (this.currentColor === STONE_WHITE) {
			alert("WHITE WON! Play again?");
		}

		this.ended = true;
		this.resetGame();
		
	}

	// Resets the game states
	resetGame() {
		this.board = this.createBoard(this.size); 
		this.currentColor = STONE_BLACK;
		this.stones_played = 0;
	}
	
	// Attempts to play a stone at position i, j
	// Returns true if the move is valid, false otherwise
	play(i, j) {

		if (this.board[i][j] !== STONE_EMPTY) {
			console.log("This spot is taken!");
			return false;
		}

		this.board[i][j] = this.currentColor;
		this.stones_played++;

		// Is this a winning move?
		if(this.isWinningMove()) {
			this.endGame(false);
		}

		// Is the game in a draw?
		if(this.stones_played === this.size * this.size) {
			this.endGame(true);
		}

		this.switchPlayer();

		return true;
	}

	// Detects if the last move played is a winning move
	// Returns true if so, false otherwise
	isWinningMove() {
		return (this.testRows(this.board) || 
				this.testCols(this.board) ||
				this.testDiagonalR(this.board) ||
				this.testDiagonalL(this.board));
	}

	// Detects the horizontal case of 5 in a row
	testRows(board) {

		let rows = [];
		let superString = "";

		for (let i = 0; i < this.size; i++) {
			rows.push(board[i].join(""));
		}

		superString = rows.join("x");

		return /(1{5,5})|(2{5,5})/.test(superString);

	}

	// Detects the vertical case of 5 in a row
	testCols(board) {

		let transposed_board = [];

		for(let i = 0; i < this.size; i++) {
			transposed_board[i] = [];
			for(let j = 0; j < this.size; j++) {
				transposed_board[i][j] = board[j][i];
			}
		}

		return this.testRows(transposed_board);

	}

	// Detects the right diagonal case of 5 in a row
	testDiagonalR(board) {

		let shifted_board = [];

		for(let i = 0; i < this.size; i++) {
			shifted_board[i] = [];
			for(let j = 0; j < this.size; j++) {
				shifted_board[i][j] = board[i][i + j];
			}
		}

		return this.testCols(shifted_board);

	}

	// Detects the left diagonal case of 5 in a row
	testDiagonalL(board) {

		let shifted_board = [];

		for(let i = 0; i < this.size; i++) {
			shifted_board[i] = [];
			for(let j = 0; j < this.size; j++) {
				shifted_board[i][j] = board[i][this.size - 1 - i - j];
			}
		}
		
		return this.testCols(shifted_board);
	}
}