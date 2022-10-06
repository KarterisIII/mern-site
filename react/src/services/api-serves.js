import axios from 'axios'

export default class ApiServise {

	instance = axios.create({
		baseURL: 'http://localhost:8000'
	})

	setLogin = () => {
		return async (params, {rejectWithValue}) => {
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
					return rejectWithValue(response.data.errors[0].msg)
				}            
			}
			catch(e) {
				return rejectWithValue(e.message)
			}       
		}
	} 
}