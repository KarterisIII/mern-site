import React, { useEffect } from 'react';
import {useDispatch } from 'react-redux';
import './login.scss'
import { useForm } from 'react-hook-form'
import ListItem from '../../item/listItem/ListItem';
import LinkPost from '../../item/Link/LinkPost';
import { errorClear, fetchUserData, fetchRegister } from '../../../redux/store/AuthSlice';

const Login = (props) => {	
	const {data, status, location, Navigate} = props
	const dispatch = useDispatch()	
	const islogin = location.pathname === '/login'
	const valueMassegeError = {
		value: /.+@.+/,
		message: "не правельный формат email",
	}
	const {
		register, 
		handleSubmit, 
		reset,
		watch,
		formState: {
			errors, 
			isValid
		}} = useForm({
			defaultValues: {
				fullName: '',
				email: 'tewr55r@mail.com',
				password: '11111111',
			},
			mode: 'onChange',
		})
		
		

		useEffect(() => {
			const subscription = watch((value) => {
				dispatch(errorClear())
			});
			return () => subscription.unsubscribe();
		  }, [watch]);

	const onSubmit =  (values) => {	
		if(islogin) {
			dispatch(fetchUserData(values))			
		}	else {
			dispatch(fetchRegister(values))			
		}			
		reset()			
	}	
	
	if(data) {
		if (data.token) {
			window.localStorage.setItem('token', data.token)
		}		
		return <Navigate to='/'/>
	}	
	
	

	
	return (
		<div className="container">
			<div className='login'>
				<ul className='login__list-button'>
					<ListItem>
						<LinkPost to={'/login'}>
							<div 
								className={islogin ? 'button-item red-button' : 'button-item'}
							>Авторизация</div>							
						</LinkPost>
					</ListItem>
					<ListItem>
						<LinkPost to={'/registration'}>
							<div 
								className={islogin ? 'button-item' : 'button-item red-button'}
							>Регистрация</div>
						</LinkPost>
					</ListItem>
				</ul>			
				<div className='login__header'>
					<h1>{islogin ? 'Авторизация' : 'Регистрация'}</h1>
				</div>
				{!status.errors ? null :<div>{status.errors[0].msg}</div> }
				<form className='form' onSubmit={handleSubmit(onSubmit)}>
					<div className='login__main'>
						{
							islogin ? null : 
								<div className='text-field'>
									<label htmlFor='name' className='label-name'>
										Ваше имя {errors.fullName?.message}
									</label>	
									<input 
										id='name' 
										type="text"	
										{...register('fullName', {required: 'Укажите имя'})}									
									/>									
								</div>							
						}
						<div className='text-field'>
						{status.parent === 'email' ? <div>{status.message}</div> : null}
							<label htmlFor='email' className='label-name'>
								Ваш email {errors.email?.message}
							</label>
							<input 
								id='email' 
								autoComplete="off"															
								{...register('email', {
										required:{
											value: true,
											message: 'Укажите почту'
										},
										pattern: {
											value: valueMassegeError.value,
											message: valueMassegeError.message
										}										
									})}	
								/>							
						</div>
						<div className='text-field'>
							{status.parent === 'password' ? <div>{status.message}</div> : null}
							<label htmlFor='password' className='label-name'>
								Ваш password {errors.password?.message}
							</label>
							<input 
								id='password' 
								type="password" 								
								autoComplete="off"
								{...register('password', {required: 'Укажитe пароль'})}
								/>							
						</div>											
					</div>
					<div className='login__footer'>
						<button disabled={!isValid} type='submit' className='auht-button'>
							{islogin ? 'Авторизироваться' : 'Зарегистрироваться'}
						</button>
					</div>				
				</form>			
			</div>
		</div>
		
		
		
	);
};

export default Login;