import React, {useState} from 'react'
import './tsDescript.scss'
import Input from './../input/Input';
import axios from '../../../axios'
import {changeTSDescript} from '../../../redux/store/TeamServices'
import { useDispatch } from 'react-redux';




const TSDescript = (props) => {
	const dispatch = useDispatch()
	const [active, setActive] = useState(false)
	const { id, postId, data, children} = props
	const [value, setValue] = useState({
		postId: '',
		id: '',
		descript: ''
	})

	const onChange = (e) => {
		const {id, value} = e.target		
		setValue(prevState => ({
			...prevState,
			[id]: value,
		}))		
	}

	const editDescript = async (id, postId) => {
		setActive(true)
		console.log(id, postId)
		const {data} = await axios.get(`/tsd-post/${id}`)
		setValue({
			...value,
			postId: postId,
			id: id,
			descript: data.descript
		})
	}

	const changeDescript = async () => {		
		const {id, postId, ...params} = value
		await axios.patch(`/tsd-post/${id}`, params)
		console.log(value)
		dispatch(changeTSDescript(value))
		setActive(false)
	}

	return (
		<div className='ts-descript'>
			{
				!active ?
				<div 
					className='ts-descript__text'
					onClick={() => editDescript(id, postId)}>
					{children}
				</div> :
				<div className='ts-descript__input'>
					<div className='input'>
						<div className='box'>
							<Input
								type='text'
								nameLabel='descript'
								value={value.descript}
								onChangeFuncion={onChange}
							/>
						</div>							
					</div>				
					<div
						onClick={changeDescript} 
						className='ts-descript__img'>
					</div>
				</div>
				
			}
		</div>
		
	);
};

export default TSDescript;