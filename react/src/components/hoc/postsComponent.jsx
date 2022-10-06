import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';


const withData = (View, getData) => {
		
	return 	(props) => {

		const setData = (data)=> {
			if (data === 'posts') {
				const {posts} = useSelector(state => state.postsSlice)
				return {posts}
			} else if (data === 'tags') {
				const {tags} = useSelector(state => state.tagsSlice)
				return {tags}
			}else if (data === 'navBar') {
				const {posts, tags} = useSelector(state => state.postsSlice)
				return {posts, tags}
			}else if (data === 'post') {
				const {post} = useSelector(state => state.fullPostsSlice.fullPosts)
				return {post}
			}else if (data === 'auht') {
				const {data} = useSelector(state => state.AuthSlice)
				return {data}
			}
		}	
				
		const dispatch = useDispatch()
		useEffect(() => {
			dispatch(getData())
		}, []) 

		return (
			<View setData={setData} {...props} />
		)
	}	
};

export default withData;