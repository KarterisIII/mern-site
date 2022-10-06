import React from 'react';
import Input from '../../item/input/Input';
import './help.scss'

const Help = () => {
	return (
		<div className='help'>
			<Input 
				label='рисунок'
				nameLabel='image'
				type='text'
				/>
			<h1>Help</h1>	
		</div>
	);
};

export default Help;	