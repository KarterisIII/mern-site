import React, { useState } from 'react';
import Button from '../button/Button';
import AdminLIne from '../adminLine/AdminLIne';
import Modal from '../modal/Modal';
import Input from '../input/Input';
import './tariffs.scss'
import axios from '../../../axios'
 

const Tariffs = (props) => {
	const {editTarif, tariffs} = props
	const [ value, setValue] =useState({
		tel: '',
		address: '',
		name: ''
	})
	const [connectionModal, setConnectionModal] = useState({	
		active: false,
		_id: '',
		title: '',
		summ: ''
	})
	
	const openModel = (item) => {
		const {_id, title, summ} = item 
		setConnectionModal({			
			active: true,
			_id,
			title,
			summ,
		})		
	}

	const handelClose =() => {
		setConnectionModal({			
			active: false,
			_id: '',
			title: '',
			summ: ''
		})
		setValue({
			tel: '',
			address: '',
			name: ''
		})
	}

	const onChange = (e) => {
		const {id, value} = e.target		
		setValue(prevState => ({
			...prevState,
			[id]: value,
		}))
	}

	const setConnect = async (tarif) => {
		
		const params = {
			tarif: tarif,
			tel: value.tel,
			address: value.address,
			name: value.name
		}

		console.log(params)

		await axios.post('/tele-post', params)
		setValue({
			tel: '',
			address: '',
			name: ''
		})
		setConnectionModal({			
			active: false,
			_id: '',
			title: '',
			summ: ''
		})

	}

	return (		
		<div className='tariffs'>
			<Modal nameModal={connectionModal.title} active={connectionModal.active} handelClose={handelClose}>
				<div className='connect'>
					<div className="connect__header">
						
					</div>
					<div className="connect__main">
						<div className="connect__main-item">
							<Input  
								label='ВАШ ТЕЛЕФОН'
								nameLabel='tel'
								type='text'
								onChangeFuncion={onChange}
								value={value.tel}
								placeholder= 'телефон'
							/>
						</div>
						<div className="connect__main-item">
							<Input  
								label='ФАМИЛИЯ ИМЯ ОТЧЕСТВО'
								nameLabel='name'
								type='text'
								onChangeFuncion={onChange}
								value={value.name}
								placeholder='фамилия имя отчество'
							/>
						</div>
						<div className="connect__main-item">
							<Input  
								label='ВАШ АДРЕС'
								nameLabel='address'
								type='text'
								onChangeFuncion={onChange}
								value={value.address}
								placeholder='Город/село, улица, дом, квартира'
							/>
						</div>						
					</div>
					<div className="connect__footer">
						<div className='connect__footer-item'>
							<Button functionName={()=> setConnect(connectionModal.title)}>
								ОТПРАВИТЬ
							</Button>
						</div>
						<div className='connect__footer-item'>
							<Button functionName={handelClose}>
								ЗАКРЫТЬ
							</Button>
						</div>
					</div>					
				</div>				
			</Modal>
			<div className='container'>
				<div className='tariffs__title'>ТАРИФЫ</div>
				<div className='tariffs__box'>
					{tariffs?.map(item => {
						return (
							<AdminLIne id={item._id} onClickEdite={editTarif} key={item._id}>
								<div  className='tariffs__item'>
									<div className='title'>
										<h2>{item.title}</h2>
									</div>
									<div className='sum'>
										<div className='sum-item'>{item.summ}</div>
										<div className='sum-item'>руб в мес</div>
									</div>
									<div className='description'>
										<p>{item.descri}</p>
									</div>
									<div className='btn-submit'>
										<Button functionName={() => openModel(item)}>
											ПОДКЛЮЧИТЬ
										</Button>
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

export default Tariffs 