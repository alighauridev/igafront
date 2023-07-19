import { createSlice } from '@reduxjs/toolkit'
import { bidStatusUpdate, createBid, getMyBids } from './bidActions'

const initialState = {
    loading: false,
    bids: [],
    hasNextPage: false,
    error: null,
}

const categorySlice = createSlice({
  name: 'bids',
  initialState,
  reducers: {
  },
  extraReducers: {
    [createBid.pending]: (state) => {
      state.loading = true
      state.error = null
    },
    [createBid.fulfilled]: (state, { payload }) => {
      state.loading = false
    },
    [createBid.rejected]: (state, { payload }) => {
      state.loading = false
      state.error = payload
    },
    [getMyBids.pending]: (state) => {
      state.loading = true
      state.error = null
    },
    [getMyBids.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.bids = [...state.bids,...payload.bids]
      state.hasNextPage = payload.hasNextPage

    },
    [getMyBids.rejected]: (state, { payload }) => {
      state.loading = false
      state.error = payload
    },
    [bidStatusUpdate.pending]: (state) => {
      state.loading = true
      state.error = null
    },
    [bidStatusUpdate.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.bids = state.bids.map((bid) => {
        if(bid._id === payload._id){
          // bid.status = payload.status
          return payload
        }
        else{
          let tempBid = bid;
          tempBid.status = "rejected"
          return tempBid
        }
      })
    },
    [bidStatusUpdate.rejected]: (state, { payload }) => {
      state.loading = false
      state.error = payload
    },
  },
})


//write selectors here
//write selectors here
//get data from state based on any filter provided
export const getFilteredBids = (state, filter) => {
  let bids = state;
  if (filter.status && filter.status!=="") {
    bids = bids.filter((bid) => bid.status.toLowerCase().includes(filter.status.toLowerCase()));
  }

  return bids;
};

export default categorySlice.reducer
