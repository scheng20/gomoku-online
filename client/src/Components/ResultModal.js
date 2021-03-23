import React, {useState, useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import '../App.css';

export default function ResultModal(props) {

	const [winnerName, setWinnerName] = useState('');
	const [winnerColor, setWinnerColor] = useState('');
	const [isWinner, setIsWinner] = useState(false);
	const [isDisconnect, setIsDisconnect] = useState(false);
	
	useEffect(() => {

		setIsDisconnect(props.opponentDisconnected);

		if(props.myColor === props.winnerColor) {
			setIsWinner(true);
			setWinnerName(props.name);
		} else {
			setIsWinner(false);
			setWinnerName(props.otherPlayerName);
		}

		if(props.winnerColor === 1) {
			setWinnerColor("black");
		} else {
			setWinnerColor("white");
		}

	}, [props.myColor, props.winnerColor, props.name, props.otherPlayerName, props.opponentDisconnected]);
	
	return (
		<Modal show={props.show} onHide={props.handleClose}>
			{isDisconnect ? 
				<div>
					<Modal.Title>Uh oh!</Modal.Title>
			        <Modal.Body>
			        	Looks like {props.otherPlayerName} has left the game.
			        </Modal.Body>
		        </div>
				:
				<div>
			        <Modal.Title>{winnerName} ({winnerColor}) has won!</Modal.Title>
			        <Modal.Body>
			        	{isWinner ? "Congratulations, you won!" : "Oh well, there's always next time!"}
			        </Modal.Body>
		        </div>
	        }
	        <Modal.Footer>
	        	<a className = "btn btn-primary" href = "/">
	        		Join a New Game
		        </a>
	          	<Button variant="secondary" onClick={props.handleClose}>
	            	Close
	          	</Button>
	        </Modal.Footer>
      	</Modal>
	);
}