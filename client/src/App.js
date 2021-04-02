import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Join from './components/Join';
import Lobby from './components/Lobby';
import Footer from './components/Footer';
import 'react-toastify/dist/ReactToastify.css';
import './App.scss';

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
			<Footer />
		</div>
	);
	
}

export default App;
