import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Comment from '../../item/comment/Comment';
import Post from '../../item/post/Post';
import Tag from '../../item/tag/Tag';
import {fetchPosts, fetchDeletePosts} from '../../../redux/store/PostSlice'
import { fetchFullPosts } from './../../../redux/store/FullPostSlice';
import { setActive } from '../../../redux/store/ActiveModal';

import './news.scss'
const News = (props) => {
	const {data} = props	
	const {items} = useSelector(state => state.postsSlice.posts)
	const dispatch = useDispatch()	
	const onClickDelete = (id) => {
		dispatch(fetchDeletePosts(id))
	}

	const changePost = (id) => {
		dispatch(setActive({
			active: true,
			nameModal: 'редактровать статью',
			component: 'edit-Post',
			postId: id
		}))		
		dispatch(fetchFullPosts(id))
	}

	useEffect(() => {
		dispatch(fetchPosts())
	}, []) 
	
	return (
		<div className='container'>
			<div className='news'>
				<div className='news__wrapper'>
					<div className='news__post'>
						<div className='post__item'>
							{items.map(obj => {
								return	(
									<Post
										key={obj._id}
										id={obj._id}
										title={obj.title}
										image={obj.imageUrl}
										text={obj.text}
										user={obj.user}
										data={data}
										onClickDelete={onClickDelete}
										changePost={changePost}
									/>
								)
							})}
						</div>
					</div>
					<div className='news__tags__comment'>
						<div className='tag__item'>
							<Tag />
						</div>
						<div className='comment__item'>
							<Comment/>
						</div>
					</div>
				</div>			
			</div>
		</div>
		
	);
};

export default News