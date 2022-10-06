import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {logout, fetchAuthMe} from '../../redux/store/AuthSlice'
import {Routes, Route, useLocation, Navigate} from 'react-router-dom';
import Header from '../header/Header';
import Home from '../pages/home/Home'
import Contacts from '../pages/Contacts';
import Help from '../pages/help/Help';
import News from '../pages/news/News';
import AboutUs from '../pages/AboutUs';
import PayOnline from '../pages/PayOnline';
import FullPost from '../pages/fullPost/FullPost';
import Login from '../pages/Login/Login';
import ModalPage from '../pages/modalPage/ModalPage';

import './app.scss'
import { fetchSlidePosts } from '../../redux/store/SlidePostsSlice';

const App = () => {
	const navName = useSelector(state => state.nameNav.nameNav)
	const {data, status} = useSelector(state => state.AuthSlice)
	const {slides} = useSelector(state => state.slidePostsSlice.slidePosts)
	const [navbar, setNavbar] = useState(false)
	const [items, setItems] = useState(0)
	const location = useLocation()
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(fetchAuthMe())
		dispatch(fetchSlidePosts())
	}, [])
	
	const onClickLogout = () => {
		dispatch(logout())
		window.localStorage.removeItem('token')
	}	
	
	useEffect(()=> {
		const changeBackground = () => {
			if(window.scrollY >= 410) {
				setNavbar(true)				
			} else {
				setNavbar(false)				
			}
		}		
		window.addEventListener('scroll', changeBackground)
		return () => {			
			window.removeEventListener('scroll', changeBackground)
		}
	}, [])	
	
	return (
		<div>		
			{/* <ModalPage/>
			<Header 
				navbar={navbar}				
				navName={navName} 
				items={items}
				user={data}
				onClickLogout={onClickLogout}
				imageArr={slides}
				/> */}
			<Routes>
				<Route path='/' element={<Home
					items={items}
					setItems={setItems}
					imageArr={slides}
					data={data}
				/>}/>
				<Route path='/vk' element={<Contacts/>}/> 
				<Route path='/news' element={<News data={data} />}/>				
				<Route path='/post/:id' element={<FullPost />}/>				
				<Route path='/help' element={<Help/>}/>
				<Route path='/ass' element={<AboutUs/>}/>
				<Route path='/pay-online' element={<PayOnline/>}/>
				<Route 
					path='/login' 
					element={
						<Login 
							data={data} 
							status={status}
							location={location}
							Navigate={Navigate}
							/>
					}
				/>
				<Route 
					path='/registration' 
					element={<Login 
						data={data} 
						status={status}
						location={location}
						Navigate={Navigate}
						/>}/>
			</Routes>

		</div>	
	);
};

export default App;