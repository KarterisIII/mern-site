import { createSlice } from '@reduxjs/toolkit';

const navName = createSlice({
	name: 'nameNav',
	initialState: {
		nameNav: [
			{
				id: 1,
				navName: 'Главная',
				nameLink: '/'
			}, {
				id: 2,
				navName: 'Акции',
				nameLink: 'acii'
			}, {
				id: 3,
				navName: 'Новости',
				nameLink: 'news'
			}, {
				id: 4,
				navName: 'Помощь',
				nameLink: 'help'
			}, {
				id: 5,
				navName: 'О нас',
				nameLink: 'ass'
			}, {
				id: 6,
				navName: 'Оплата онлайн',
				nameLink: 'pay-online'
			}, {
				id: 7,
				navName: 'Контакты',
				nameLink: 'vk'
			}
		]
	},
	reducers: {
		setNameNav: (state, action) => {
			state.nameNav.push(action.payload)
		}
	}
})
 
export const {setNameNav} = navName.actions

export default navName.reducer