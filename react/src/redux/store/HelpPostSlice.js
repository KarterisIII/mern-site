import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios'

const initialState = {
	helpPosts: {
		items: [],
		status: null,
		error: null,
	}
}

export const fetchHelpPosts = createAsyncThunk(
	'helpPosts/fetchHelpPosts',
	async () => {
		const { data} = await axios.get('/help-posts')
		return data
	}	
)

const helpPostsSlice = createSlice({
	name: 'helpPosts',
	initialState,
	reduser: {

	},

	extraReducers: {
		[fetchHelpPosts.pending]: (state) => {
			state.posts.items = []
			state.posts.status = 'loading'
			state.posts.error = null
		},
		[fetchHelpPosts.fulfilled]: (state, action) => {
			state.posts.status = 'resolved'
			state.posts.items = action.payload
			state.posts.error = null
		},
		[fetchHelpPosts.rejected]: (state) => {
			state.posts.items = []
			state.posts.status = null
			state.posts.error = 'error'
		},
	}
})

export default helpPostsSlice.reducer