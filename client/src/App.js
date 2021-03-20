import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Join from './Components/Join';
import Lobby from './Components/Lobby';

function App() {
	
	return (
		<Router>
			<Route path = "/" exact component = {Join} />
			<Route path = "/game" component = {Lobby} />
		</Router>
	);
	
}

export default App;
