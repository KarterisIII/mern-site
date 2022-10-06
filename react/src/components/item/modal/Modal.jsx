import React from 'react';
import './modal.scss'




const Modal = (props) => {	
	const {handelClose, children, active, nameModal} = props
	const backgroundModal = active ? 'modal active' : 'modal'
	const contextModal = active ? 'modal__content active' : 'modal__content'
	
	return (
		<div 
			className={backgroundModal} 
			onClick={handelClose}>
			<div 
				className = {contextModal}
				onClick = {
					e => e.stopPropagation()
				} >
				<div className='modal-title'>{nameModal}</div>
				{children}
			</div>
			
		</div>
	);
};

export default Modal;