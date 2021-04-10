import React from 'react';
import Emoji from './Emoji';
import Popover from 'react-bootstrap/Popover';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import { HeartFill, QuestionCircleFill, BugFill, Github } from 'react-bootstrap-icons';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Footer() {

	const info_popover = (
	  <Popover className = "footer-popover">
	    <Popover.Title className = "footer-popover-title">How to Play</Popover.Title>
	    <Popover.Content className = "footer-popover-content">
	    	<p className = "mb-2">
	    		Place five same-colored stones in a line and you win!
	    		<Emoji symbol=" 🎉 "/>
	    		If you're still stuck, checkout more instructions 
	      		<a className = "footer-link" href = "https://en.wikipedia.org/wiki/Gomoku" target = "_blank" rel="noopener noreferrer"> here.</a>
	    	</p>
	    </Popover.Content>
	  </Popover>
	);
	
	const about_popover = (
	  <Popover className = "footer-popover">
	    <Popover.Title className = "footer-popover-title">About this Game</Popover.Title>
	    <Popover.Content className = "footer-popover-content">
	    	<p className = "mb-2">
	    		Heyo! <Emoji symbol="👋 "/>
	    		I'm Sheena and I made this little game. You can checkout more projects made by me
	      		<a className = "footer-link" href = "https://scheng.ca/#projects" target = "_blank" rel="noopener noreferrer"> here.</a>
	    	</p>
	    </Popover.Content>
	  </Popover>
	);

	const bug_popover = (
	  <Popover className = "footer-popover">
	    <Popover.Title className = "footer-popover-title">Report a Bug</Popover.Title>
	    <Popover.Content className = "footer-popover-content">
	    	<p>
	    		Found a bug in this game? 
	    	</p>
	    	<p>
	    		First of all, I'm sorry about any inconveniences this bug has caused you. <Emoji symbol="🙇 "/>
	    		This project is my first multiplayer web game and I still have a lot to learn.
	    		Here's a <a className = "footer-link" href = "https://github.com/scheng20/gomoku-online/issues" target = "_blank" rel="noopener noreferrer"> list of known issues </a> that I aim to resolve in the future.
	    	</p>
	    	<p className = "mb-2">
	    		If your bug is not on that list and you would like to report it, please
	      		<a className = "footer-link" href = "mailto:hello@scheng.ca" target = "_blank" rel="noopener noreferrer"> send me an email here. </a>
	    	</p>
	    </Popover.Content>
	  </Popover>
	);

	const github_popover = (
	  <Popover className = "footer-popover">
	    <Popover.Title className = "footer-popover-title">View on GitHub</Popover.Title>
	    <Popover.Content className = "footer-popover-content">
	    	<p className = "mb-2">
	    		Did you know that you can view the code behind this game on GitHub?
	    		<Emoji symbol=" 💻"/>
	      		<a className = "footer-link" href = "https://github.com/scheng20/gomoku-online" target = "_blank" rel="noopener noreferrer"> Check it out here! </a>
	    	</p>
	    </Popover.Content>
	  </Popover>
	);

	return (
	    <div className = "footer">
	    	<OverlayTrigger trigger="focus" placement="top" overlay={info_popover}>
		    	<button className="footer-button">
		    		<QuestionCircleFill color="white" size={26}/>
		    	</button>
		  	</OverlayTrigger>
	    	<OverlayTrigger trigger="focus" placement="top" overlay={about_popover}>
		    	<button className="footer-button">
		    		<HeartFill color="white" size={26}/>
		    	</button>
		  	</OverlayTrigger>
		  	<OverlayTrigger trigger="focus" placement="top" overlay={bug_popover}>
		    	<button className="footer-button">
		    		<BugFill color="white" size={26}/>
		    	</button>
		  	</OverlayTrigger>
		  	<OverlayTrigger trigger="focus" placement="top" overlay={github_popover}>
		    	<button className="footer-button">
		    		<Github color="white" size={26}/>
		    	</button>
		  	</OverlayTrigger>
	    </div>
    );
}