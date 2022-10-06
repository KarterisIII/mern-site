import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	data: {
		active: false,
		nameModal: null,
		component: null,
		nameButtom: null,
	}	
}

const activeModalSlice = createSlice({
	name: 'activeModal',
	initialState,
	reducers: {
		setActive: (state, action) => {
			console.log(action.payload)
			state.data = action.payload
		}
	}
	 
})

export const {setActive} = activeModalSlice.actions
export default activeModalSlice.reducer