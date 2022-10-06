import React from 'react';
import { useDispatch } from 'react-redux';
import { setActive } from '../../../redux/store/ActiveModal';
import { setNameNav } from '../../../redux/store/NavigetName';
import './createHeaderMenu.scss'

const CreateHeaderMenu = () => {
	const dispatch = useDispatch()
	const [navName, setNameMenu] = React.useState('')
	const [nameLink, setNameLink] = React.useState('')

	const handleSubmit = (e) => {
		e.preventDefault()
		const nameNavMenu = {
			id: new Date().toString(),
			navName: navName,
			nameLink: nameLink
		}		
		// dispatch(setNameNav(nameNavMenu))
		// dispatch(setActive(false))
		setNameMenu('')
		setNameLink('')
	}

	return (
		<div className='form'>
			<form>
				<h2>Создание раздела меню</h2>
				<div className='form__input'>
					<input 
						value={navName} 
						onChange={(e) => setNameMenu(e.target.value)}
						name='name-menu' 
						type='text' 
						placeholder='Название раздела...'/>
					<input 
						value={nameLink} 
						onChange = {(e) => setNameLink(e.target.value)}
						name='name_link' 
						tupe='text' 
						placeholder='Используйте кирилицу'/>
				</div>	
				<div className='form__button'>
					<button type='submit' onClick={handleSubmit}>Создать</button>
				</div>			
				
			</form>
			
		</div>
	);
};

export default CreateHeaderMenu;