import React from 'react';
import './header.scss'
import logo from '../../images/logo.png'
import HeaderTop from './headerTop/HeaderTop';
import NavMenu from './navMenu/NavMenu';

const Header = (props) => {
	
	const {navName, navbar, user, onClickLogout, imageArr, items} = props
	
	return (
		<header 
			style={{backgroundImage: `url(http://localhost:8000${imageArr[items]?.imageUrl})`}} 
			className='header'>
			 <div 			  
			 className='header__wrapper'>
			 	<HeaderTop logo={logo} navbar={navbar}/>
				<NavMenu navName={navName} navbar={navbar} user={user} onClickLogout={onClickLogout}/>				
			 </div>			 
		</header>
	);
};

export default Header;