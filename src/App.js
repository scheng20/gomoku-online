import './App.css';
import GomokuGame from './Game/Gomoku.js';

let game = new GomokuGame(19);

function App() {

	// TEST SUITE
	/*
	game.play(0,0);
	game.play(1,0);
	game.play(0,1);
	game.play(2,0);
	game.play(0,2);
	game.play(3,0);
	game.play(0,3);
	game.play(4,0);
	game.play(0,4);
	*/

	return (
		<div className="App">
			<h1> Gomoku Online </h1>
			<p> An online port of the classic game: Gomoku </p>
		</div>
	);
}

export default App;
