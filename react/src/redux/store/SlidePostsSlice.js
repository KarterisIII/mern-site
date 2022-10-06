import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios'

const initialState = {
	slidePosts: {
		slides: [],
		status: null,
		error: null,
	}
}

export const fetchSlidePosts = createAsyncThunk(
	'slidePosts/fetchSlidePosts',
	async () => {
		const { data} = await axios.get('/slide-posts')
		return data
	}	
)

const slidePostsSlice = createSlice({
	name: 'slidePosts',
	initialState,
	extraReducers: {
		[fetchSlidePosts.pending]: (state) => {
			state.slidePosts.slides = []
			state.slidePosts.status = 'loading'
			state.slidePosts.error = null
		},
		[fetchSlidePosts.fulfilled]: (state, action) => {
			state.slidePosts.status = 'resolved'
			state.slidePosts.slides = action.payload
			state.slidePosts.error = null
		},
		[fetchSlidePosts.rejected]: (state) => {
			state.slidePosts.slides = []
			state.slidePosts.status = null
			state.slidePosts.error = 'error'
		},
	}
})

export default slidePostsSlice.reducer