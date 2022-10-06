import React, { useState, useRef, useEffect } from 'react';
import LinkPost from '../Link/LinkPost';

import './slider.scss'

const Slider = (props) => {
	const {items, setItems, imageArr} = props
	const timeoutRef = useRef(null) 

	const goToSlide = (slideIndex) => {
		setItems(slideIndex)
	}

	const resetTimeout = () => {
		if(timeoutRef.current) {
			clearTimeout(timeoutRef.current)
		}
	}
	
	useEffect(() => {
		resetTimeout()
		timeoutRef.current = setTimeout(
			() => 
				setItems((prevItems) => 
					prevItems === imageArr.length - 1 ? 0 : prevItems + 1
				), 3000			
		)
		return () => resetTimeout()
	}, [items])
		
	return (
		<div style={{backgroundImage: `url(http://localhost:8000${imageArr[items]?.imageUrl})`}}
			 className='slider'>
			<div className="container">				
				<div className='slider__item'>
					<LinkPost to={`/${imageArr[items]?._id}`}>
						<div className="slider__title">
							{imageArr[items]?.title}												
						</div>
					</LinkPost>					
				</div>					
				<div className='slider__pointer'>
					<div className='pointer__wrapper'>
						{imageArr.map((slider, slideIndex) => (
							<div 
								key={slider?._id}
								onClick={() => goToSlide(slideIndex)}
								className='pointer__item'>
								<div 
									className={`item__front ${items === slideIndex ? 
									'slide__passive': 'slide__active'}`}></div>		
								<div 
									className={`item__back ${items === slideIndex ? 
									'slide__active' : 'slide__passive'}`}></div>						
							</div>									
						))}	
					</div>
				</div>					
			</div>						
		</div>
	);
};

export default Slider;