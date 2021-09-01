import React from 'react';
import classes from './Header.module.css';

const Header = () => {
	const handleRefresh = () => {
		window.location.reload();
	};

	return (
		<header className={classes.header}>
			<h1>Calculate The Longest Time Teammates!</h1>
			<button onClick={handleRefresh}>Refresh</button>
		</header>
	);
};

export default Header;
