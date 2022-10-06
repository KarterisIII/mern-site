import React from 'react';
import './informPost.scss'

const InformPost = (props) => {
	const {tags, user, date} = props
	
	const newDate = date.substr(0, 10)
	return (
		<div className='inform-post'>
			<div className='info-tag inform-list'>
				<div className="icon"></div>				
				{tags.map(tag => {
					return	<i key={tag}>{tag}</i>
				})}
			</div>
			<div className='date inform-list'>	
				<div className="icon"></div>			
				{newDate}
			</div>
			<div className='user inform-list'>	
				<div className="icon"></div>			
				{user.fullName}
			</div>
			<div className='comment inform-list'>
				
			</div>			
		</div>
	);
};

export default InformPost;