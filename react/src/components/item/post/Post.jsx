import React from 'react';
import LinkPost from '../../item/Link/LinkPost';
import ImageItem from '../imageItem/ImageItem'
import './post.scss'


const Post = (props) => {
	const {text, image, title, id, data, user, onClickDelete, changePost} = props	
	const str = `${text.substr(0, 100).replace(/[^a-zа-яё0-9\s]/gi, ' ')}...`	

	const edit = data?._id === user._id || data?._id === user ? 
	<div onClick={() => changePost(id)}  className='post__edit'></div> : null
	const deletePost = data?._id === user._id || data?._id === user ? 
	<div onClick={()=> onClickDelete(id)} className='post__delete'></div> : null

	
	return (		
		<div className='post'>
			{edit}
			{deletePost}
			<LinkPost to={`/post/${id}`}>
				<div className='post__wrapper'>
					<div className='post__header'>
						<div className='title'>
							<h2 data-content={title}>
								{title}
							</h2>
						</div>
					</div>
					<div className='post__main'>
						<div className="post__img">
							<ImageItem className='img__item' src={image} alt={title} width={'300'}/>
						</div>
						<div className='post__content'>
							{str}							
						</div>
					</div>			
					
				</div>	
			</LinkPost>	
			<div className='post__footer'>
				<LinkPost to={`/post/${id}`}>
					<div className='post__link'>
						<span data-content="описание">описание</span>
					</div>				
				</LinkPost>
			</div>		
		</div>		
	);
};

export default Post;