import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios'

const initialState = {	
		helpPost: [],
		status: null,
		error: null,	
}

export const fetchFullHelpPosts = createAsyncThunk(
	'fullHelpPosts/fetchFullHelpPosts',
	async (id) => {
		const { data} = await axios.get(`/help-post/${id}`)
		return data
	}	
)

const fullHelpPostsSlice = createSlice({
	name: 'fullHelpPosts',
	initialState,

	extraReducers: {
		[fetchFullHelpPosts.pending]: (state) => {
			state.post = []
			state.status = 'loading'
			state.error = null
		},
		[fetchFullHelpPosts.fulfilled]: (state, action) => {
			state.status = 'resolved'
			state.post = action.payload
			state.error = null
		},
		[fetchFullHelpPosts.rejected]: (state) => {
			state.post = []
			state.status = null
			state.error = 'error'
		},
	}
})

export default fullHelpPostsSlice.reducer