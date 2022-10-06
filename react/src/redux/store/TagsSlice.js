import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios'


const initialState = {
	tags: {
		items: [],
		status: null,
		error: null,
	}
}

export const fetchTags = createAsyncThunk(
	'tags/fetchTags',
	async () => {
		const { data} = await axios.get('/posts/tags')
		return data
	}	
)

const tagsSlice = createSlice({
	name: 'tags',
	initialState,
	reduser: {

	},

	extraReducers: {
		[fetchTags.pending]: (state) => {
			state.tags.items = []
			state.tags.status = 'loading'
			state.tags.error = null
		},
		[fetchTags.fulfilled]: (state, action) => {
			state.tags.status = 'resolved'
			state.tags.items = action.payload
			state.tags.error = null
		},
		[fetchTags.rejected]: (state) => {
			state.tags.items = []
			state.tags.status = null
			state.tags.error = 'error'
		}
	}
})

export default tagsSlice.reducer