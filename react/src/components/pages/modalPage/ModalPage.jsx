import React from 'react';
import Modal from '../../item/modal/Modal';
import AddPost from '../addPost/AddPost';
import { useDispatch, useSelector } from 'react-redux'
import { setActive } from '../../../redux/store/ActiveModal'

import './modalPage.scss'
import  { fetchEditPost } from './../../../redux/store/EditPosts';
import { fetchChangePost } from './../../../redux/store/ChangePost';
import { fetchAddSlide } from './../../../redux/store/AddSlide';


const initialState  = {
	title: '',
	text: '',
	imageUrl: null,
	tag: ''
}
const ModalPage = () => {
	const dispatch = useDispatch()
	const {active, nameModal, component, postId} = useSelector((state) => state.activeModal.data)	
	const {post, status} = useSelector(state => state.fullPostsSlice)
	const {title, text, imageUrl, tags} = post	
	const [value, setValue] = React.useState(initialState)		
	
	const dispatchFunction = () => {
		setValue(initialState)
		dispatch(setActive({
			active: false,
			nameModal: null,
			component: null,
		}))
	}

	React.useEffect(() => {	
		if(status === 'resolved' && postId){			
			setValue({				 
				...value, 
				title: title,
				text: text,
				imageUrl: imageUrl,
				tag: tags.join(',')	
			})			
		}					
	},[post])			
	
	const handelClose = () => {
		dispatchFunction()
	}

	const addPost = () => {
		const {tag, ...dataPost} = value
		const tags = tag.split(',')
		const data = {...dataPost, tags}
		dispatch(fetchEditPost(data))
		dispatchFunction()		
	}

	const addServices = () => {
		console.log('services')
		dispatchFunction()
	}
	
	const addSlide = () => {
		console.log('slide')
		dispatch(fetchAddSlide(value))
		dispatchFunction()
	}

	const addHelp = () => {
		console.log('help')		
		dispatchFunction()
	}

	const addStock = () => {
		console.log('stock')
		dispatchFunction()
	}	

	const changePost = (id) => {
		const {tag, ...dataPost} = value
		const tags = tag.split(',')
		const data = {...dataPost, tags, id}
		dispatch(fetchChangePost(data))
		dispatchFunction()
	}

	const getComponent = () => {
		switch(component) {
			case 'add-Post':
				return addPost()
			case 'add-services':
				return addServices()
			case 'add-Help':
				return addHelp()
			case 'add-Stock':
				return addStock()
			case 'add-Slide':
				return addSlide()
			case 'edit-Post':
				return changePost(postId)
			default:
				return 
		}
	}

	return (
		<Modal 
			active={active}
			nameModal={nameModal}
			handelClose={handelClose}
			>
			<AddPost 
				handelClose={handelClose} 
				getComponent={getComponent} 
				value={value}
				setValue={setValue}	
				component={component}
				postId={postId}
				/>
		</Modal>
	);
};

export default ModalPage;