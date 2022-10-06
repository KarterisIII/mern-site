import React from 'react'
import SimpleMDE from 'react-simplemde-editor'
import axios from '../../../axios'
import Button from '../../item/button/Button'
import ImageItetm from '../../item/imageItem/ImageItem'
import './addPost.scss'


import 'easymde/dist/easymde.min.css'
import Input from './../../item/input/Input';

const AddPost = (props) => {
	
	const {handelClose, getComponent, value, setValue, component, postId} = props
	const {title, text,	imageUrl, tag} = value
	const onChangeText = React.useCallback((value) => {
		setValue((prevState) =>({
			...prevState,
			text: value
		}))		
	  }, [])
	  

	  const onChange = e => {
		const {id, value} = e.target		
		setValue(prevState => ({
			...prevState,
			[id]: value,
		}))
	  }	

	  const onChangeFile = async (e) => {
		try {
				const formData = new FormData()
				const file = e.target.files[0]
				formData.append('image', file)
				const {data} = await axios.post('/upload', formData)
				console.log(data)
				setValue(prevState => ({
					...prevState,
					imageUrl: data.url
				}))
			console.log(value)
		} catch (error) {
			console.warn(err)
		}
	  }

	  const onClickRemiveImage = () => {
		setValue(prevState => ({
			...prevState,
			imageUrl: null
		}))
	  }

	  const options = React.useMemo(
		() => ({
		  spellChecker: false,
		  maxHeight: '200px',
		  width: '500px',
		  autofocus: true,
		  placeholder: 'Введите текст...',
		  status: false,
		  autosave: {
			enabled: true,
			delay: 1000,
		  },
		}), []
	  )

	return (
		<div className='container'>
			<div className='add-post'>				
				{ !imageUrl ?
					<div className='input-box'>	
					<Input
						label='ЗАГРУЗИТЬ РИСУНОК'
						nameLabel='imageUrl'
						type='file'
						onChangeFuncion={onChangeFile}
					/>									
					</div>:	
					<div className='remove-img'>
						<div className="img-box">
							<ImageItetm	src={imageUrl} alt="upload" width='600'/>	
						</div>															
						<Button functionName={onClickRemiveImage}>
							удалить картинку
						</Button>
					</div>
					}
				<div className='input-box'>
					<Input
						label='ЗАГОЛОВОК'
						nameLabel='title'
						type='text'
						onChangeFuncion={onChange}
						value={title}
					/>
				</div>
				{component === 'add-Post' || component === 'edit-Post' ? 
				<div className='input-box'>
					<Input
						label='ТЭГИ'
						nameLabel='tag'
						type='text'
						onChangeFuncion={onChange}
						value={tag}
					/>														
				</div> : null}			
				<div className='add-post__main'>					
					<SimpleMDE 							 
						value={text} 
						onChange={onChangeText} 
						options={options} />					
				</div>
				<div className='add-post__footer'>
					<div className='footer__buttom'>
						<Button functionName={getComponent}>
							отправить
						</Button>
					</div>
					<div className='footer__buttom'>
						<Button functionName={handelClose} >
							отмена
						</Button>
					</div>						
				</div>
			</div>
		</div>
	);
};

export default AddPost;