import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios'
import { changePost } from './PostSlice';


const initialState = {
	data: null,
	status: null,
	error: null

}

export const fetchChangePost = createAsyncThunk(
	'changePost/fetchChangePost',
	async (params, {rejectWithValue, dispatch}) => {
		const { id, ...dataPost} = params
		const response = await axios.patch(`/post/${id}`, dataPost)
								.then(function (response) {
									return response
								})
								.catch(function (error) {
									return error.response
								});
								
								dispatch(changePost(params))
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

const changePostsSlice = createSlice({
	name: 'changePost',
	initialState,
	extraReducers: {
		[fetchChangePost.pending]: (state) => {
			state.data = null
			state.status = 'loading'
			state.error = null
		},
		[fetchChangePost.fulfilled]: (state, action) => {
			state.status = 'resolved'
			state.data = action.payload
			state.error = null
		},
		[fetchChangePost.rejected]: (state, action) => {
			if (action.payload) {
				state.data = []
				state.status = null
				state.error = action.payload
			} else {
				state.error = action.error
			}		
		},		
	}
})



export default changePostsSlice.reducer