import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getAllNotifications = createAsyncThunk(
	'notification/getAllNotifications',
	async (filter, { rejectWithValue }) => {
		try {
			const res = await fetch(`http://localhost:3003/api/users/list?notification=${filter.arr.join(',')}`)

			if (res.statusText !== 'OK') {
				throw new Error('Error')
			}
			return await res.json()

		} catch (err) {
			return rejectWithValue(err.message)
		}
	}
)

const notificationSlice = createSlice({
	name: 'notification',
	initialState: {
		data: [],
		status: '',
		error: '',
	},
	reducers: {
		emptyNotification : (state) => {
			state.data = []
	  }
	},
	extraReducers: (builder) => {
		builder
			.addCase(getAllNotifications.pending, (state) => {
				state.status = 'Loading'
				state.error = ''
			})
			.addCase(getAllNotifications.rejected, (state, action) => {
				state.status = 'Error'
				state.error = action.payload
			})
			.addCase(getAllNotifications.fulfilled, (state, action) => {
				state.status = 'Done'
				state.data = action.payload
			})
	}
})

export const { emptyNotification } = notificationSlice.actions
export default notificationSlice.reducer