const size = 19;

// Detects if the current game board is in a winning state
const isWinningState = (board) => {
	return (testRows(board) || 
			testCols(board) ||
			testDiagonalR(board) ||
			testDiagonalL(board));
}

// Detects the horizontal case of 5 in a row
const testRows = (board) => {

	let rows = [];
	let superString = "";

	for (let i = 0; i < size; i++) {
		rows.push(board[i].join(""));
	}

	superString = rows.join("x");

	return /(1{5,5})|(2{5,5})/.test(superString);

}

// Detects the vertical case of 5 in a row
const testCols = (board) => {

	let transposed_board = [];

	for(let i = 0; i < size; i++) {
		transposed_board[i] = [];
		for(let j = 0; j < size; j++) {
			transposed_board[i][j] = board[j][i];
		}
	}

	return testRows(transposed_board);

}
	
// Detects the right diagonal case of 5 in a row
const testDiagonalR = (board) => {

	let superString = "";

	for(let i = 0; i < size; i++) {
		for(let j = 0; j < size; j++) {

			superString = "";

			for(let k = 0; k < 5; k++) {
				if(i + k < size && j + k < size) {
					superString += board[i + k][j + k];
				}
			}

			if(/(1{5,5})|(2{5,5})/.test(superString)) {
				return true;
			}

		}
	}

	return false;
}

// Detects the left diagonal case of 5 in a row
const testDiagonalL = (board) => {

	let superString = "";

	for(let i = 0; i < size; i++) {
		for(let j = 0; j < size; j++) {

			superString = "";

			for(let k = 0; k < 5; k++) {
				if(i + k < size && j - k >= 0) {
					superString += board[i + k][j - k];
				}
			}

			if(/(1{5,5})|(2{5,5})/.test(superString)) {
				return true;
			}

		}
	}
	
	return false;
}

module.exports = {isWinningState};