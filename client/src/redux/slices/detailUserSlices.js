import { createSlice } from '@reduxjs/toolkit'

const userInfoFromStorage=localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null

export const detailUserSlice = createSlice({
	name: 'detail',
	initialState: {
		data: userInfoFromStorage,
		},
	reducers: {
		getUserInfo: (state, action) => {
			localStorage.setItem('user', JSON.stringify(action.payload))
			state.data = action.payload
		},
	},
})

export const { getUserInfo } = detailUserSlice.actions

export default detailUserSlice.reducer