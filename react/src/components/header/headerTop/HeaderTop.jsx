import React from 'react';
import { Link } from 'react-router-dom';

const HeaderTop = (props) => {
	const {logo, navbar} = props

	const headerClass = navbar ? 'header__logo margin-menu' : 'header__logo'
	return (
		<div className='container'>
			<div className={headerClass}>
				<div>
					<Link to='/'>
						<img src={logo} alt="logo" />
					</Link>
				</div>
				<div className='header__time-work'>
					<div className='time-work'>
						<span>Время работы технической поддержки:</span>
						<span>24/7</span>
					</div>
					<div className='phone'>
						<div className='icons__phone'></div>
						<span>+7 (978) 766-95-86</span>
					</div>
				</div>					
			</div>
		</div>
		
	);
};

export default HeaderTop;