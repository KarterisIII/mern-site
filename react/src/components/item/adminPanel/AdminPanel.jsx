import React from 'react';
import './adminPanel.scss'
import Button from '../../item/button/Button';
import { useDispatch } from 'react-redux';
import { setActive } from '../../../redux/store/ActiveModal';
import { logout } from '../../../redux/store/AuthSlice';
import AdminName from '../../../services/adminPanelName'


const AdminPanel = (props) => {
	const {active} = props
	const dispatch = useDispatch()
	const backgroundPanel = active ? 'panel-active' : 'background-panel'

	const createAllPost = (nameModal, component, nameButtom) => {
		dispatch(setActive({
			active: true,
			nameModal,
			component,
			nameButtom
		}))
	}

	const exit = () => {
		dispatch(logout())
		window.localStorage.removeItem('token')
	}

	return (
		<div className={backgroundPanel}>
			<div className='container'>
				<div className='wrapper'>	
					{AdminName.map(item => {
						const {nameModal, component, id, nameButtom} = item
						return (
							<Button 
								key={id}
								functionName={() => createAllPost(nameModal, component, nameButtom)} 
								children={nameButtom}/>
						)
					})}	
					<Button functionName={exit} children={'Выйти'}/>
				</div>			
			</div>
		</div>
		
	);
};

export default AdminPanel;