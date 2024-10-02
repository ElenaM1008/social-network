import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlices'
import findUsersReducer from './slices/findUsersSlice'
import notificationReducer from './slices/notificationSlices'
import friendsReducer from './slices/friendsSlices'
import detailUserReducer from './slices/detailUserSlices'

export const store = configureStore({
  reducer: {
	auth: authReducer,
	findUser: findUsersReducer,
	notification: notificationReducer,
	friends: friendsReducer,
	detail: detailUserReducer,
  },
})