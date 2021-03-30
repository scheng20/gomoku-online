import React from 'react';

export default function ColorCard(props) {

	let classes = "intersection " + props.color.toLowerCase() + " card-stone";

	return (
	    <div className = "card">
			<div className = "card-body">
				<div className = "row">
					<div className = "col-2">
						<div className = {classes} />
					</div>
					<div className = "col-10">
						<p className = "card-title"> {props.color} </p>
						<p> {props.player ? "Player: " + props.player : "Waiting for player to join..."} </p>
					</div>
				</div>
			</div>
		</div>
    );
}