import React from 'react';
import './tag.scss'
import ListItem from '../listItem/ListItem';
import withData from './../../hoc/postsComponent';
import {fetchTags} from '../../../redux/store/TagsSlice'


const Tag = (props) => {
	const {setData} = props	

	const {tags:{items}} = setData('tags')
	
	return (
		<div className='tag'>
			<div className='tag__header'>
				<h2>
					Категории
				</h2>
			</div>
			<div className='tag__main'>
				<ul className='tag__list'>				
					{items.map((tag, i) => {
						return <ListItem key={i}>
								<a href="#1">
									<span data-content={tag}>
										{tag}
									</span>
									</a>
								</ListItem>
					})}					
				</ul>			
			</div>			
		</div>
			
	);
};

export default withData(Tag, fetchTags);