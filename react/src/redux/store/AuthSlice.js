import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios'


export const fetchUserData = createAsyncThunk(
	'auth/fetchUserData',
	async (params, {rejectWithValue}) => {
		const response = await axios.post('/auth/login', params)
								.then(function (response) {
									return response
								})
								.catch(function (error) {
									return error.response
								});
								console.log(response)
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

export const fetchAuthMe = createAsyncThunk(
	'auth/fetchAuthMe',
	async (_, {rejectWithValue}) => {
		const response = await axios.get('/auth/me')
								.then(function (response) {
									return response
								})
								.catch(function (error) {
									return error.response
								})
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

export const fetchRegister = createAsyncThunk(
	'auth/fetchRegister',
	async (params, {rejectWithValue}) => {
		const response = await axios.post('/auth/register', params)
								.then(function (response) {
									return response
								})
								.catch(function (error) {
									return error.response
								})
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

const initialState = {
	data: null,
	status: {},	
}

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {		
		errorClear: (state) => {
			state.status = {}
		},		
		logout: (state) => {
			state.data = null
		},		
	},
	extraReducers: {
		[fetchUserData.pending]: (state) => {
			state.data = null
			state.status = {}			
		},
		[fetchUserData.fulfilled]: (state, action) => {
			state.status = {}
			state.data = action.payload			
		},
		[fetchUserData.rejected]: (state, action) => {				
			if (action.payload) {
				state.data = null
				state.status = action.payload
			} else {
				state.status = action.error
			}			
		},
		[fetchAuthMe.pending]: (state) => {
			state.data = null
			state.status = {}			
		},
		[fetchAuthMe.fulfilled]: (state, action) => {
			state.status = {}
			state.data = action.payload			
		},
		[fetchAuthMe.rejected]: (state, action) => {				
			if (action.payload) {
				state.data = null
				state.status = action.payload
			} else {
				state.status = action.error
			}			
		},
		[fetchRegister.pending]: (state) => {
			state.data = null
			state.status = {}			
		},
		[fetchRegister.fulfilled]: (state, action) => {
			state.status = {}
			state.data = action.payload			
		},
		[fetchRegister.rejected]: (state, action) => {				
			if (action.payload) {
				state.data = null
				state.status = action.payload
			} else {
				state.status = action.error
			}			
		},
	}
})

export const {errorClear, logout} = authSlice.actions


export default authSlice.reducer