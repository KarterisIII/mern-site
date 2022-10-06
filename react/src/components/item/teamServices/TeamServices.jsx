import React, { useState } from 'react'
import AdminLIne from '../adminLine/AdminLIne'
import axios from '../../../axios'
import Modal from '../modal/Modal';
import { useDispatch } from 'react-redux';
import './teamServices.scss'
import TSDescript from './../tsDescript/TSDescript';
import Input from '../input/Input';
import Button from './../button/Button';
import {changeTeamServices} from '../../../redux/store/TeamServices'




const TeamServices = (props) => {
	const {teamServices, data} = props	
	const dispatch = useDispatch()
    const [active, setActive] = useState(false)
	const [value, setValue] =useState({
		id: '',
		title: '',
		summ: '',
	})

	const onChange = (e) => {
		const {id, value} = e.target		
		setValue(prevState => ({
			...prevState,
			[id]: value,
		}))		
	}

	const openModal = (item) => {
		setActive(true)
		console.log(item)
		setValue({
			...value,
			id: item._id,
			title: item.title,
			summ: item.summ
		})
	}

	const changeTServices = async () => {
		const {id, ...params} = value		 
		await axios.patch(`/ts-post/${id}`, params)

		console.log(params)
		dispatch(changeTeamServices(value))
		setActive(false)
	}

	const closeModal = () => {
		setActive(false)
	}

	return (		
		<div className='team-services'>
			<div className='container'>
				<div className='team-services-title'>					
					УСЛУГИ МОНТАЖНОЙ БРИГАДЫ					
				</div>
				<Modal active={active} handelClose={closeModal}>
					<Input
						value={value.title}
						nameLabel='title'
						label='Изменить имя тарифа'
						type='text'	
						onChangeFuncion={onChange}
					/>
					<Input
						value={value.summ}
						nameLabel='summ'
						label='Изменить сумму тарифа'
						type='text'	
						onChangeFuncion={onChange}
					/>
					<Button functionName={changeTServices}>
						Отправить
					</Button>
					<Button functionName={closeModal}>
						Отмена
					</Button>
				</Modal>
				<div className='team-services-box'>
					{teamServices.map(item => {
						
						return (
							<AdminLIne key={item._id} onClickEdite={openModal} id={item}>
								<div className="team-services__item">
									<div className="item__header">
										<div className="item__header-img"></div>
										<div className="item__header-title">{item.title}</div>
									</div>
									<div className="item__main">{`${item.summ} Р`}</div>
									<div  className="item__footer">
										{										
											item.descript.map(arr  => {											
												return (
													<div key={arr._id}>
														{
															data ?															
															<TSDescript
																id={arr._id}
																postId={item._id}>
																{arr.descript}
															</TSDescript>:
															<div className='item__footer-item'>
																{arr.descript}
															</div>
														}	
													</div>													
																																						
												)
											})
										}
									</div>
								</div>
							</AdminLIne>								
						)
					})}
				</div>				
			</div>
		</div>		
	);
};

export default TeamServices;