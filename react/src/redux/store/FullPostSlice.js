import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios'

const initialState = {	
		post: [],
		status: null,
		error: null,
	
}

export const fetchFullPosts = createAsyncThunk(
	'fullPosts/fetchFullPosts',
	async (id) => {
		const {data} = await axios.get(`/post/${id}`)
		return data
	}	
)

const fullPostsSlice = createSlice({
	name: 'fullPosts',
	initialState,
	reducers: {
		clearPostId: (state) => {
			state.post = []
		}
	},
	extraReducers: {
		[fetchFullPosts.pending]: (state) => {
			state.post = []
			state.status = 'loading'
			state.error = null
		},
		[fetchFullPosts.fulfilled]: (state, action) => {
			state.status = 'resolved'
			state.post = action.payload
			state.error = null
		},
		[fetchFullPosts.rejected]: (state) => {
			state.post = []
			state.status = null
			state.error = 'error'
		},
	}
})

export const {clearPostId} = fullPostsSlice.actions

export default fullPostsSlice.reducer