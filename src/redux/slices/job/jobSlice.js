import { createSlice } from '@reduxjs/toolkit'
import { createDispute, createJob, getBidsonAJob, getJobById, getJobs, jobDelivery, updateJob, updateJobStatusMy } from './jobActions'

const initialState = {
    loading: false,
    jobs: [],
    error: null,
    success: false,
}

const jobSlice = createSlice({
  name: 'jobs',
  initialState,
  hasNextPage:false,
  reducers: {
  },
  extraReducers: {
    [createJob.pending]: (state) => {
      state.loading = true
      state.error = null
    },
    [createJob.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.jobs = [...state.jobs,payload]
    },
    [createJob.rejected]: (state, { payload }) => {
      state.loading = false
      state.error = payload
    },
    [getJobs.pending]: (state) => {
      state.loading = true
      state.error = null
    },
    [getJobs.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.jobs = [...state.jobs,...payload.jobs]
      state.hasNextPage = payload.hasNextPage
    },
    [getJobs.rejected]: (state, { payload }) => {
      state.loading = false
      state.error = payload
    },
    [getJobById.pending]: (state) => {
      state.loading = true
      state.error = null
    },
    [getJobById.fulfilled]: (state, { payload }) => {
      state.loading = false
      //not sure if this is the best way to do this but i am not sure how to update the state in regrads to the id
    },
    [getJobById.rejected]: (state, { payload }) => {
      state.loading = false
      state.error = payload
    },
    [jobDelivery.pending]: (state) => {
      state.loading = true
      state.error = null
    },
    [jobDelivery.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.jobs = state.jobs.map((job) => {
        if(job._id === payload._id){
          job = payload
        }
        return job
      })
    },
    [jobDelivery.rejected]: (state, { payload }) => {
      state.loading = false
      state.error = payload
    },
    [createDispute.pending]: (state) => {
      state.loading = true
      state.error = null
    },
    [createDispute.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.jobs = state.jobs.map((job) => {
        console.log(job)
        if(job._id === payload._id){
          console.log("HERE")
          job = payload
        }
        return job
      })
    },
    [createDispute.rejected]: (state, { payload }) => {
      state.loading = false
      state.error = payload
    },
    [updateJob.pending]: (state) => {
      state.loading = true
      state.error = null
    },
    [updateJob.fulfilled]: (state, { payload }) => {
      state.loading = false
      //replace the object with the payload
      state.jobs = state.jobs.map((job) => {
        console.log(job._id)
        if(job._id === payload._id){
          console.log("HERE")
          job = payload
        }
        return job
      })
    },
    [updateJob.rejected]: (state, { payload }) => {
      state.loading = false
      state.error = payload
    },
  },
})



//write selectors here
//get data from state based on any filter provided
export const getFilteredJobs = (state, filter) => {
  let jobs = state;
  if (filter.category && filter.category!=="") {
    jobs = jobs.filter((job) => job.category === filter.category);
  }
  if (filter.subCategory && filter.subCategory!=="") {
    jobs = jobs.filter((job) => job.subCategory === filter.subCategory);
  }
  if (filter.createdAt && filter.createdAt!=="") {
    console.log(filter.createdAt)
    console.log(new Date(filter.createdAt))
    jobs = jobs.filter((job) => new Date(job.createdAt) <= new Date(filter.createdAt));
  }
  if (filter.name && filter.name!=="") {
    //add name filter that searches for name in title and description and does not care about case sensitivity and also does not care about the order of the words and not care if matches completely or not just if it contains the word
    jobs = jobs.filter((job) => job.title.toLowerCase().includes(filter.name.toLowerCase()) || job.description.toLowerCase().includes(filter.name.toLowerCase()));

  }
  return jobs;
};


export default jobSlice.reducer
