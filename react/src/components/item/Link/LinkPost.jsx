import React from 'react';
import { Link } from 'react-router-dom';


const LinkPost = ({children, to, ...props}) => {
	return (
		<Link to={to}>
			{children}
		</Link>
	);
};

export default LinkPost;