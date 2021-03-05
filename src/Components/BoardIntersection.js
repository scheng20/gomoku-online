import React, {useState} from 'react';

export default function BoardIntersection(props) {

	const style = {
		top: props.row * props.grid_size,
		left: props.col * props.grid_size
	};

	const [classes, setClasses] = useState("intersection");

	const handleClick = () => {
		
		let current_color = props.color;
		
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