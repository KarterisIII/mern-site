import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios'

const initialState = {	
		SlidePost: [],
		status: null,
		error: null,
	
}

export const fetchFullSlidePosts = createAsyncThunk(
	'fullSlidePosts/fetchFullSlidePosts',
	async (id) => {
		const { data} = await axios.get(`/slide-post/${id}`)
		return data
	}	
)

const fullSlidePostsSlice = createSlice({
	name: 'fullSlidePosts',
	initialState,

	extraReducers: {
		[fetchFullSlidePosts.pending]: (state) => {
			state.post = []
			state.status = 'loading'
			state.error = null
		},
		[fetchFullSlidePosts.fulfilled]: (state, action) => {
			state.status = 'resolved'
			state.post = action.payload
			state.error = null
		},
		[fetchFullSlidePosts.rejected]: (state) => {
			state.post = []
			state.status = null
			state.error = 'error'
		},
	}
})

export default fullSlidePostsSlice.reducer