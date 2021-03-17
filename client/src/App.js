import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Join from './Components/Join';
import Game from './Components/Game';

function App() {
	
	return (
		<Router>
			<Route path = "/" exact component = {Join} />
			<Route path = "/game" component = {Game} />
		</Router>
	);
	
}

export default App;
