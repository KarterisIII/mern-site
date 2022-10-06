import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios'
import { addPost } from './PostSlice';


const initialState = {
	data: null,
	status: {}

}

export const fetchEditPost = createAsyncThunk(
	'editPost/fetchEditPost',
	async (params, {rejectWithValue, dispatch}) => {
		const response = await axios.post('/post', params)
								.then(function (response) {
									return response
								})
								.catch(function (error) {
									return error.response
								});
								
								dispatch(addPost(response.data))
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

const editPostsSlice = createSlice({
	name: 'editPost',
	initialState,
	reducers: {

	},
	extraReducers: {
		[fetchEditPost.pending]: (state) => {
			state.data = null
			state.status = {}			
		},
		[fetchEditPost.fulfilled]: (state, action) => {
			state.status = {}
			state.data = action.payload		

		},
		[fetchEditPost.rejected]: (state, action) => {				
			if (action.payload) {
				state.data = null
				state.status = action.payload
			} else {
				state.status = action.error
			}			
		},
	}
	 
})

export default editPostsSlice.reducer