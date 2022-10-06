import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios'



export const fetchPosts = createAsyncThunk(
	'posts/fetchPosts',
	async () => {
		const {data} = await axios.get('/posts')
		
		return data.reverse()
		
	}	
)

export const fetchDeletePosts = createAsyncThunk(
	'posts/fetchDeletePosts',
	async (id, {rejectWithValue, dispatch}) => {
		const response = await axios.delete(`/post/${id}`)
								.then(function (response) {
									return response
								})
								.catch(function (error) {
									return error.response
								});
								console.log(response)
								dispatch(deletePost(id)) 					
		try {            
            if (response.status === 200) {
                return response.data
            }
			if (response.status === 400) {                
				return rejectWithValue(response.data)
            }
			if (response.status === 404) {                
				return rejectWithValue(response.data)
            }    			  
        }
        catch(e) {
			return rejectWithValue(e.message)
		}   
		
	}	
)


const postsSlice = createSlice({
	name: 'posts',
	initialState: {
		posts: {
			items: [],
			status: null,
			error: null,
		}
	},		
	reducers: {
		deletePost(state, action) {	
			console.log(action)		
			state.posts.items = state.posts.items
			.filter((item) => item._id !== action.payload)			
		},
		addPost(state, action) {
			console.log(action.payload)
			state.posts.items.unshift(action.payload)
		},
		changePost(state, action) {
			console.log(action.payload)			
			const postIdItem = state.posts.items
			.find(post => post._id === action.payload.id) 			
			postIdItem.title = action.payload.title
			postIdItem.text = action.payload.text
			postIdItem.imageUrl = action.payload.imageUrl
			postIdItem.tags = action.payload.tags			
		}
	},
	extraReducers: {
		[fetchPosts.pending]: (state) => {
			state.posts.items = []
			state.posts.status = 'loading'
			state.posts.error = null
		},
		[fetchPosts.fulfilled]: (state, action) => {
			state.posts.status = 'resolved'
			state.posts.items = action.payload
			state.posts.error = null
		},
		[fetchPosts.rejected]: (state) => {
			state.posts.items = []
			state.posts.status = null
			state.posts.error = 'error'
		},
		[fetchDeletePosts.rejected]: (state, action) => {
			if (action.payload) {
				state.posts.items = []
				state.posts.status = null
				state.posts.error = action.payload
			} else {
				state.posts.error = action.error
			}			
		},
		
	}
})

export const {deletePost, addPost, changePost} = postsSlice.actions

export default postsSlice.reducer