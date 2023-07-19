import { createSlice } from '@reduxjs/toolkit'
import { createDisputeMy, getMyJobs } from './myJobActions'

const initialState = {
    loading: false,
    jobs: [],
    hasNextPage: false,
    completedJobs:0,
    deliveredJobs:0,
    inProgressJobs:0,
    error: null,
    success: false,
}

const myJobSlice = createSlice({
  name: 'myJobs',
  initialState,
  reducers: {
  },
  extraReducers: {
    [getMyJobs.pending]: (state) => {
      state.loading = true
      state.error = null
    },
    [getMyJobs.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.jobs = [...state.jobs,...payload.jobs]
      state.hasNextPage = payload.hasNextPage
      state.completedJobs = payload.completedJobs
      state.deliveredJobs = payload.deliveredJobs
      state.inProgressJobs = payload.inProgressJobs
    },
    [getMyJobs.rejected]: (state, { payload }) => {
      state.loading = false
      state.error = payload
    },
    [createDisputeMy.pending]: (state) => {
      state.loading = true
      state.error = null
    },
    [createDisputeMy.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.jobs = state.jobs.map((job) => {
        if (job._id === payload._id) {
          return payload
        }
        return job
      })
    },
    [createDisputeMy.rejected]: (state, { payload }) => {
      state.loading = false
      state.error = payload
    }
  },
})






export default myJobSlice.reducer
