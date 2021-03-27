import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import Join from './Components/Join';
import Lobby from './Components/Lobby';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {
	
	return (
		<div className = "container-fluid">
			<Router>
				<Route path = "/" exact component = {Join} />
				<Route path = "/game" component = {Lobby} />
			</Router>
			<ToastContainer closeOnClick={false} />
		</div>
	);
	
}

export default App;
