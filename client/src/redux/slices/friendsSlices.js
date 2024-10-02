import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getAllFriends = createAsyncThunk(
	'friends/getAllFriends',
	async (filter, { rejectWithValue }) => {
		try {
			const res = await fetch(`http://localhost:3003/api/users/list?friends=${filter.arr.join(',')}`)

			if (res.statusText !== 'OK') {
				throw new Error('Error')
			}
			return await res.json()

		} catch (err) {
			return rejectWithValue(err.message)
		}
	}
)

const friendsSlice = createSlice({
	name: 'friends',
	initialState: {
		data: [],
		status: '',
		error: '',
	},
	reducers: {
		noFriends : (state) => {
			state.data = []
	  }
	},
	extraReducers: (builder) => {
		builder
			.addCase(getAllFriends.pending, (state) => {
				state.status = 'Loading'
				state.error = ''
			})
			.addCase(getAllFriends.rejected, (state, action) => {
				state.status = 'Error'
				state.error = action.payload
			})
			.addCase(getAllFriends.fulfilled, (state, action) => {
				state.status = 'Done'
				state.data = action.payload
			})
	}
})

export const { noFriends } = friendsSlice.actions
export default friendsSlice.reducer