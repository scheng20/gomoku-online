import React, {useState} from 'react';

export default function BoardIntersection(props) {

	const style = {
		top: props.row * props.grid_size,
		left: props.col * props.grid_size
	};

	const [classes, setClasses] = useState("intersection");

	const handleClick = () => {

		// TODO - Fix issue where current color isn't being updated correctly resulting in the stones
		// not being updated correctly
		
		let current_color = props.color;
		console.log("Props.color: " + props.color);

		if (props.play(props.row, props.col)) {
			
			if (current_color === 1) {
				setClasses("intersection black");
			} else if (current_color === 2) {
				setClasses("intersection white");
			}	
		}
	}
	
	return <div key = {[props.row, props.col]} onClick = {handleClick} className = {classes} style = {style}></div>;
}