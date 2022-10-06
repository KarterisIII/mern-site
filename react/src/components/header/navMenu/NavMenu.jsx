import React from 'react';
import { NavLink } from 'react-router-dom';
import AdminPanel from '../../item/adminPanel/AdminPanel';


const NavMenu = (props) => {
	const {navName, navbar, user} = props
	
	const navClass = navbar ? 'nav__wrapper nav-active' : 'nav__wrapper'	
	const panel = user ? <AdminPanel active={navbar}/> : null

	return (
		<div className={navClass}>
			<div className='nav__box'>
				<nav className='navbar'>
					<ul className='nav__links'>
						{navName.map(({id, navName, nameLink}) => {
							return (
								<li key={id}>
									<NavLink to={nameLink}>
										<span>{navName}</span>
										<span>{navName}</span>
									</NavLink>
								</li>
							)						
						})}					
					</ul>								
				</nav>				
			</div>	
			{panel}
		</div>
	);
};

export default NavMenu;