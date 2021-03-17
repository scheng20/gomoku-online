import React, {useEffect} from 'react';
import io from 'socket.io-client';

let socket;

export default function Join() {

	const ENDPOINT = 'localhost:5000';

	useEffect(() => {

		socket = io(ENDPOINT, { transports : ['websocket'] });
		
		socket.emit('join', () => {});

		return () => {
			socket.emit('disconnect');
			socket.off();
		}

	}, [ENDPOINT]);

	return (
		<h1> Join </h1>
	);
	
}