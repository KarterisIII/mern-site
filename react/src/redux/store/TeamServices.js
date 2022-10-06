import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios'

const initialState = {
	posts: {
		teamServices: [],
		status: null,
		error: null,
	}
}

export const fetchTeamServices = createAsyncThunk(
	'teamServices/fetchTeamServices',
	async () => {
		const {data} = await axios.get('/ts-posts')		
		return data		
	}	
)

export const fetchEditTeamServices = createAsyncThunk(
	'teamServices/fetchEditTeamServices',
	async (params, {rejectWithValue, dispatch}) => {
		const response = await axios.post('/ts-post', params)
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

const teamServicesSlice = createSlice({
	name: 'teamServices',
	initialState,
	reducers: {
		addTeamServices: (state, action) => {
			state.posts.teamServices.push(action.payload)
		},
		changeTeamServices(state, action) {		
			console.log(action.payload)			
			const postIdItem = state.posts.teamServices
			.find(post => post._id === action.payload.id) 			
			postIdItem.title = action.payload.title
			postIdItem.summ = action.payload.summ	
		},
		changeTSDescript(state, action) {
			console.log(action)
			const postIdTSD = state.posts.teamServices
			.find((post) => post._id === action.payload.postId)
			const postId = postIdTSD.descript
			.find(item => item._id === action.payload.id)
			postId.descript = action.payload.descript
		},
	},
	extraReducers: {
		[fetchEditTeamServices.pending]: (state) => {
			state.posts.teamServices = []
			state.posts.status = 'loading'
			state.posts.error = null
		},
		[fetchEditTeamServices.fulfilled]: (state, action) => {
			state.posts.status = 'resolved'
			state.posts.teamServices = action.payload
			state.posts.error = null
		},
		[fetchEditTeamServices.rejected]: (state, action) => {				
			if (action.payload) {
				state.data = null
				state.status = action.payload
			} else {
				state.status = action.error
			}			
		},
		[fetchTeamServices.pending]: (state) => {
			state.posts.teamServices = []
			state.posts.status = 'loading'
			state.posts.error = null
		},
		[fetchTeamServices.fulfilled]: (state, action) => {
			state.posts.status = 'resolved'
			state.posts.teamServices = action.payload
			state.posts.error = null
		},
		[fetchTeamServices.rejected]: (state) => {
			state.posts.teamServices = []
			state.posts.status = null
			state.posts.error = 'error'
		},
		
	}
	 
})

export const {changeTeamServices, changeTSDescript} = teamServicesSlice.actions

export default teamServicesSlice.reducer