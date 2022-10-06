import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import Comment from '../../item/comment/Comment';
import Tag from '../../item/tag/Tag';
import './fullPost.scss'
import InformPost from '../../item/informPost/InformPost';
import ImageItetm from '../../item/imageItem/ImageItem'
import InformComment from '../../item/informCommen/InformComment';
import { useDispatch, useSelector } from 'react-redux';
import { clearPostId, fetchFullPosts } from '../../../redux/store/FullPostSlice';

const FullPost = () => {	
	const {post, status} = useSelector(state => state.fullPostsSlice)
	const {title, text, imageUrl, tags, user, createdAt} = post	
	const dispatch = useDispatch()
	const {id} = useParams()
	useEffect(() => {
		dispatch(fetchFullPosts(id))				
	},[])		
	
	if(status === 'resolved') {
		return (	
			<div className="container">
				<div className='full-post'>
					<div className="full-post__box">
						<div className='full-posr__header'>
							<div className="header__image">
							<ImageItetm className={'img__item'} src={imageUrl} alt={title} />
							</div>
							<div className="header__title">
								<h2>{title}</h2>
							</div>
						</div>
						<div className="full-post__main">
							<div className="text">
								<ReactMarkdown children={text} remarkPlugins={[remarkGfm]} />
							</div>
						</div>
						<div className="full-post__footer">
							<div className="footer__top">
								<InformPost 
									user={user}
									date={createdAt}
									tags={tags}									
									/>
							</div>
							<div className="footer__bottom">
								<InformComment />
							</div>
						</div>
					</div>
					<div className='full-post__tags__comment'>
						<div className='tag__item'>
							<Tag />
						</div>
						<div className='comment__item'>
							<Comment/>
						</div>
					</div>
				</div>		
			</div>			
		);
	}	
};

export default FullPost;