import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios'


const initialState = {
	data: null,
	status: {}

}

export const fetchAddSlide = createAsyncThunk(
	'addSlide/fetchAddSlide',
	async (params, {rejectWithValue, dispatch}) => {
		const response = await axios.post('/slide-post', params)
								.then(function (response) {
									return response
								})
								.catch(function (error) {
									return error.response
								});								
								
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

const addSlideSlice = createSlice({
	name: 'addSlide',
	initialState,
	extraReducers: {
		[fetchAddSlide.pending]: (state) => {
			state.data = null
			state.status = {}			
		},
		[fetchAddSlide.fulfilled]: (state, action) => {
			state.status = {}
			state.data = action.payload		

		},
		[fetchAddSlide.rejected]: (state, action) => {				
			if (action.payload) {
				state.data = null
				state.status = action.payload
			} else {
				state.status = action.error
			}			
		},
	}
	 
})

export default addSlideSlice.reducer