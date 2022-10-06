import React from 'react';
import './button.scss'


const Button = (props) => {
	const {functionName, children} = props
	return (
		<button className='button' onClick={functionName}>
			{children}
		</button>
			
	);
};

export default Button;