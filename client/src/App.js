import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import Join from './Components/Join';
import Lobby from './Components/Lobby';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {
	
	return (
		<div>
			<Router>
				<Switch>
					<Route path = "/" exact component = {Join} />
					<Route path = "/game" component = {Lobby} />
					<Redirect to = "/" />
				</Switch>
			</Router>
			<ToastContainer closeOnClick={false} />
		</div>
	);
	
}

export default App;
