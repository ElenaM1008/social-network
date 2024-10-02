import { createSlice } from '@reduxjs/toolkit'

const userInfoFromStorage=localStorage.getItem('userDetails') ? JSON.parse(localStorage.getItem('userDetails')) : null

const initialState = {
	currentUser: userInfoFromStorage
}

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		login: (state, action) => {
			localStorage.setItem('userDetails', JSON.stringify(action.payload))
			state.currentUser = action.payload
		},
		logout: (state) => {
			localStorage.removeItem('userDetails')
			state.currentUser = null
		},
	},
})

export const { login, logout } = authSlice.actions

export default authSlice.reducer