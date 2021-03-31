import React from 'react';
import Emoji from './Emoji';

export default function Footer() {
	return (
	    <p className = "my-0"> Made with <Emoji symbol="😎🍍"/>, React, and Bootstrap • © Sheena Cheng {new Date().getFullYear()} </p>
    );
}