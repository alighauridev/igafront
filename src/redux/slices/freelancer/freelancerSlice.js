import { createSlice } from '@reduxjs/toolkit'
import { getFreelancers, getFreelancerById } from './freelancerAction'

const initialState = {
    loading: false,
    freelancers: [],
    hasNextPage: false,
    error: null,
    success: false,
}

const freelancerslice = createSlice({
  name: 'freelancers',
  initialState,
  reducers: {
  },
  extraReducers: {
    [getFreelancers.pending]: (state) => {
      state.loading = true
      state.error = null
    },
    [getFreelancers.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.freelancers = [...state.freelancers,...payload.freelancers]
      state.hasNextPage = payload.hasNextPage
    },
    [getFreelancers.rejected]: (state, { payload }) => {
      state.loading = false
      state.error = payload
    },
    [getFreelancerById.pending]: (state) => {
      state.loading = true
      state.error = null
    },
    [getFreelancerById.fulfilled]: (state, { payload }) => {
      state.loading = false
    },
    [getFreelancerById.rejected]: (state, { payload }) => {
      state.loading = false
      state.error = payload
    },
  },
})



//write selectors here
//get data from state based on any filter provided
export const getFilteredFreelancers = (state, filter) => {
  let freelancers = state;
  
  if (filter.name && filter.name!=="") {
    //add name filter that searches for name in title and description and does not care about case sensitivity and also does not care about the order of the words and not care if matches completely or not just if it contains the word
    freelancers = freelancers.filter((freelancer) => freelancer.name.toLowerCase().includes(filter.name.toLowerCase()));

  }
  if (filter.title && filter.title!=="") {
    //add name filter that searches for name in title and description and does not care about case sensitivity and also does not care about the order of the words and not care if matches completely or not just if it contains the word
    freelancers = freelancers.filter((freelancer) => freelancer.title.toLowerCase().includes(filter.title.toLowerCase()) || freelancer.bio.toLowerCase().includes(filter.title.toLowerCase()));

  }
  return freelancers;
};


export default freelancerslice.reducer
