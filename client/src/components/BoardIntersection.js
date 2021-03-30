import React, {useState, useEffect} from 'react';

export default function BoardIntersection(props) {

	const style = {
		top: props.row * props.grid_size,
		left: props.col * props.grid_size
	};

	const [classes, setClasses] = useState("intersection");
	
	useEffect(() => {
		
		if(props.color === 0) {
			setClasses("intersection");
		} else if (props.color === 1) {
			setClasses("intersection black");
		} else {
			setClasses("intersection white");
		}

	}, [props.color]);
	
	const handleClick = () => {
		props.play(props.row, props.col);
	}
	
	return <div key = {[props.row, props.col]} onClick = {handleClick} className = {classes} style = {style}></div>;
}