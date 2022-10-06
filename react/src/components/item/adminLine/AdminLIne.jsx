import React from 'react';
import './adminLine.scss'
import { useSelector } from 'react-redux';


const AdminLIne = (props) => {
	const {children, onClickDelete, onClickEdite, id} = props
	const {data, status} = useSelector(state => state.AuthSlice)
	const clickDelete = onClickDelete ? 
		<div 
			title='удалить' 
			onClick={onClickDelete} 
			className='wrapper-delete'></div> :
			null
	
	const admin = data ?  'wrapper-line' : null
	return (
		<div className={admin}>
			<div title='редактировать' onClick={() => onClickEdite(id)} className='wrapper-edit'></div>
			{clickDelete}
			{children}			
		</div>
	);
};

export default AdminLIne;