import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const findAllUser = createAsyncThunk(
	'findUser/findAllUser',
	async (filter, { rejectWithValue }) => {
		try {
			const res = await fetch(`http://localhost:3003/api/users/list?not=${filter.login}&search=${filter.search}`)

			if (res.statusText !== 'OK') {
				throw new Error('Error')
			}
			return await res.json()

		} catch (err) {
			return rejectWithValue(err.message)
		}
	}
)

const findUserSlice = createSlice({
	name: 'findUser',
	initialState: {
		data: [],
		status: '',
		error: '',
		filter: {
			search: '',
		}
	},
	reducers: {
		changeSearch: (state, action) => {
			state.filter = {
				...state.filter,
				search: action.payload
			}
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(findAllUser.pending, (state) => {
				state.status = 'Loading'
				state.error = ''
			})
			.addCase(findAllUser.rejected, (state, action) => {
				state.status = 'Error'
				state.error = action.payload
			})
			.addCase(findAllUser.fulfilled, (state, action) => {
				state.status = 'Done'
				state.data = action.payload
			})
	}
})

export const { changeSearch } = findUserSlice.actions
export default findUserSlice.reducer