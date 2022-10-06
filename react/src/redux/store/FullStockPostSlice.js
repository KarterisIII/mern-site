import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios'

const initialState = {	
		stockPost: [],
		status: null,
		error: null,
	
}

export const fetchFullStockPosts = createAsyncThunk(
	'fullStockPosts/fetchFullStockPosts',
	async (id) => {
		const { data} = await axios.get(`/stock-post/${id}`)
		return data
	}	
)

const fullStockPostsSlice = createSlice({
	name: 'fullStockPosts',
	initialState,	

	extraReducers: {
		[fetchFullStockPosts.pending]: (state) => {
			state.post = []
			state.status = 'loading'
			state.error = null
		},
		[fetchFullStockPosts.fulfilled]: (state, action) => {
			state.status = 'resolved'
			state.post = action.payload
			state.error = null
		},
		[fetchFullStockPosts.rejected]: (state) => {
			state.post = []
			state.status = null
			state.error = 'error'
		},
	}
})

export default fullStockPostsSlice.reducer