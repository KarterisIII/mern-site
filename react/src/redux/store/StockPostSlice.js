import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios'

const initialState = {
	stockPosts: {
		items: [],
		status: null,
		error: null,
	}
}

export const fetchStockPosts = createAsyncThunk(
	'stockPosts/fetchStockPosts',
	async () => {
		const { data} = await axios.get('/stock-posts')
		return data
	}	
)

const stockPostsSlice = createSlice({
	name: 'stockPosts',
	initialState,
	reduser: {

	},

	extraReducers: {
		[fetchStockPosts.pending]: (state) => {
			state.posts.items = []
			state.posts.status = 'loading'
			state.posts.error = null
		},
		[fetchStockPosts.fulfilled]: (state, action) => {
			state.posts.status = 'resolved'
			state.posts.items = action.payload
			state.posts.error = null
		},
		[fetchStockPosts.rejected]: (state) => {
			state.posts.items = []
			state.posts.status = null
			state.posts.error = 'error'
		},
	}
})

export default stockPostsSlice.reducer