import React from 'react';
import './input.scss'

const Input = (props) => {
	const {
		nameLabel, 
		label, 
		value, 
		type, 
		placeholder,
		onChangeFuncion} = props

	const inputBox = type === 'text' ? 'input-text' : 'input-file' 
	const inputTitle = type === 'text' ? 'input-title-text' : 'input-title-file'
	const inputItem = type === 'text' ? 'input-item-text' : 'input-item-file'

	return (
		<div className={inputBox}>
			<label 
				className={inputTitle} 
				htmlFor={nameLabel}>
				{label}
			</label>
			<input 
				value={value}
				className={inputItem}
				id={nameLabel} 
				type={type} 
				onChange={onChangeFuncion}
				placeholder={placeholder}
				/>
		</div>
	);
};

export default Input;