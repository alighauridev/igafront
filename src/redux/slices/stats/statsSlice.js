import { createSlice } from '@reduxjs/toolkit'
import { getStats } from './statsActions'

const initialState = {
    loading: false,
    stats: {},
    error: null,
}

const statsSlice = createSlice({
  name: 'stats',
  initialState,
  reducers: {
  },
  extraReducers: {
    [getStats.pending]: (state) => {
      state.loading = true
      state.error = null
    },
    [getStats.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.stats = payload
    },
    [getStats.rejected]: (state, { payload }) => {
      state.loading = false
      state.error = payload
    },

  },
})


//write selectors here



export default statsSlice.reducer
