import { createSlice } from '@reduxjs/toolkit'
import { addCategory, deleteCategory, getCategory, updateCategory } from './categoryActions'

const initialState = {
    loading: false,
    category: [],
    error: null,
}

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
  },
  extraReducers: {
    [getCategory.pending]: (state) => {
      state.loading = true
      state.error = null
    },
    [getCategory.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.category = payload
    },
    [getCategory.rejected]: (state, { payload }) => {
      state.loading = false
      state.error = payload
    },
    [addCategory.pending]: (state) => {
      state.loading = true
      state.error = null
    },
    [addCategory.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.category = [payload,...state.category,]
    },
    [addCategory.rejected]: (state, { payload }) => {
      state.loading = false
      state.error = payload
    },
    [updateCategory.pending]: (state) => {
      state.loading = true
      state.error = null
    },
    [updateCategory.fulfilled]: (state, { payload }) => {
      state.loading = false
      let index = state.category.findIndex((category)=>category._id === payload._id)
      state.category[index] = payload
    },
    [updateCategory.rejected]: (state, { payload }) => {
      state.loading = false
      state.error = payload
    },
    [deleteCategory.pending]: (state) => {
      state.loading = true
      state.error = null
    },
    [deleteCategory.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.category = state.category.filter((category)=>category._id !== payload._id)
     
    },
    [deleteCategory.rejected]: (state, { payload }) => {
      state.loading = false
      state.error = payload
    },
  },
})


export const selectCategoryById = (state, categoryId) =>{
 return state.category.category.filter((category)=>category._id === categoryId)[0]
}



export default categorySlice.reducer
