import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios'

const initialState = {
	posts: {
		tariffs: [],
		status: null,
		error: null,
	}
}

export const fetchTariffs = createAsyncThunk(
	'tariffs/fetchTariffs',
	async () => {
		const {data} = await axios.get('/tariffs')		
		return data		
	}	
)

export const fetchEditTariffs = createAsyncThunk(
	'tariffs/fetchEditTariffs',
	async (params, {rejectWithValue, dispatch}) => {
		const response = await axios.post('/tariffs', params)
								.then(function (response) {
									return response
								})
								.catch(function (error) {
									return error.response
								});
								
								dispatch(addTarif(response.data))
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

const tariffsSlice = createSlice({
	name: 'tariffs',
	initialState,
	reducers: {
		addTarif: (state, action) => {
			state.posts.tariffs.push(action.payload)
		},
		changeTarif(state, action) {
			console.log(action.payload)			
			const postIdItem = state.posts.tariffs
			.find(post => post._id === action.payload.id) 			
			postIdItem.title = action.payload.title
			postIdItem.descri = action.payload.descri
			postIdItem.summ = action.payload.summ			
		}
	},
	extraReducers: {
		[fetchEditTariffs.pending]: (state) => {
			state.posts.tariffs = []
			state.posts.status = 'loading'
			state.posts.error = null
		},
		[fetchEditTariffs.fulfilled]: (state, action) => {
			state.posts.status = 'resolved'
			state.posts.tariffs = action.payload
			state.posts.error = null
		},
		[fetchEditTariffs.rejected]: (state, action) => {				
			if (action.payload) {
				state.data = null
				state.status = action.payload
			} else {
				state.status = action.error
			}			
		},
		[fetchTariffs.pending]: (state) => {
			state.posts.tariffs = []
			state.posts.status = 'loading'
			state.posts.error = null
		},
		[fetchTariffs.fulfilled]: (state, action) => {
			state.posts.status = 'resolved'
			state.posts.tariffs = action.payload
			state.posts.error = null
		},
		[fetchTariffs.rejected]: (state) => {
			state.posts.tariffs = []
			state.posts.status = null
			state.posts.error = 'error'
		},
		
	}
	 
})

export const {changeTarif} = tariffsSlice.actions

export default tariffsSlice.reducer