import React, {useState, useEffect} from 'react';
import Modal from 'react-bootstrap/Modal';
import Emoji from './Emoji';

export default function ResultModal(props) {

	const [winnerName, setWinnerName] = useState('');
	const [winnerColor, setWinnerColor] = useState('');
	const [isWinner, setIsWinner] = useState(false);
	
	useEffect(() => {

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
		<Modal className = "result-modal" show={props.show} onHide={props.handleClose}>
			{props.opponentDisconnected ? 
				<div>
					<div className = "result-emoji"> <Emoji symbol="😢"/> </div>
					<Modal.Title className = "result-title">Uh oh!</Modal.Title>
			        <Modal.Body className = "result-text">
			        	Looks like {props.disconnectedName} has left the game.
			        </Modal.Body>
		        </div>
				:
				<div>
					<div className = "result-emoji"> {isWinner ? <Emoji symbol="🎉"/> : <Emoji symbol="🤷"/>} </div>
			        <Modal.Title className = "result-title">{winnerName} ({winnerColor}) has won!</Modal.Title>
			        <Modal.Body className = "result-text">
			        	{isWinner ? "Congratulations, you won!" : "Oh well, there's always next time."}
			        </Modal.Body>
		        </div>
	        }
	        <Modal.Footer className = "result-button-container">
	        	<a className = "btn btn-primary" href = "/">
	        		Join a New Game
		        </a>
	          	<button className = "btn btn-primary" onClick={props.handleClose}>
	            	Close
	          	</button>
	        </Modal.Footer>
      	</Modal>
	);
}