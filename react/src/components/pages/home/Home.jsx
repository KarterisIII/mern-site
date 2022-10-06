import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {changeTarif, fetchTariffs} from '../../../redux/store/TariffsSlice'
import Button from '../../item/button/Button';
import Input from '../../item/input/Input';
import Modal from '../../item/modal/Modal';
import Slider from '../../item/slider/Slider';
import Tariffs from '../../item/tariffs/Tariffs';
import Bank from '../../item/bank/Bank'
import axios from '../../../axios'
import './home.scss'
import TeamServices from './../../item/teamServices/TeamServices';
import { fetchTeamServices } from './../../../redux/store/TeamServices';
import SliderServices from './../../item/sliderServices/SliderServices';

const initialState = {
	id: '',
	title: '',
	summ: '',
	descri: '',
}

const Home = (props) => {
	const {items, setItems, imageArr, data} = props
	const {tariffs} = useSelector(state => state.tariffsSlice.posts)
	const dispatch = useDispatch()
	const [active, setActive] = useState(false)
	const [value, setValue] = useState(initialState)
	const {teamServices} = useSelector(state => state.teamServices.posts)
	
	useEffect(() => {
		dispatch(fetchTariffs())
		dispatch(fetchTeamServices())
	}, [])

	const handelClose = () => {
		setActive(false)
		setValue(initialState)
	}
	
	const editTarif = async (id) => {
		
		const {data} = await axios.get(`/tarif/${id}`)
		
		setValue({
			...value,
			id: id,
			title: data.title,
			summ: data.summ,
			descri: data.descri
		})
		
		setActive(true)
	}

	const editTarifButton = async () => {		
		const {id, ...params} = value
		await axios.patch(`/tarif/${id}`, params)
		dispatch(changeTarif(value))
		setActive(false)
	}

	const onChange = (e) => {
		const {id, value} = e.target		
		setValue(prevState => ({
			...prevState,
			[id]: value,
		}))
	}

	return (
		<div className='home'>	
			{/* <Modal
				active={active}
				handelClose={handelClose}
				nameModal='Редактировать тариф'>
				<div className="edit-tarif">
					<Input
						label='НАЗВАНИЕ ТАРИФА'
						value={value.title}
						nameLabel='title'
						type='text'
						onChangeFuncion={onChange}
					/>
					<Input
						label='CУММА'
						value={value.summ}
						nameLabel='summ'
						type='text'
						onChangeFuncion={onChange}
					/>
					<Input
						label='ОПИСАНИЕ'
						value={value.descri}
						nameLabel='descri'
						type='text'
						onChangeFuncion={onChange}
					/>
					<div className='buttons-tarif'>
						<div className='button-edit'>
							<Button functionName={editTarifButton}>
								Редактировать
							</Button>
						</div>
						<div className='button-close'>
							<Button functionName={handelClose}>
								Отмена
							</Button>
						</div>
					</div>
				</div>				
			</Modal>
			<Slider
				items={items}
				setItems={setItems}
				imageArr={imageArr}
			/>
			<Tariffs 
				tariffs={tariffs}
				editTarif={editTarif}/>
			<TeamServices
				data={data}
				teamServices={teamServices}
			/> */}
			{/* <Bank/> */}
			<SliderServices/>
		</div>
	);
};

export default Home;