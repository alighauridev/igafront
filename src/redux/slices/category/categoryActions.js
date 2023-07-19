import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../api/axios";
import { errorHandler } from "../../erroHandler";
import { toast } from "react-toastify";

export const getCategory = createAsyncThunk(
  "category/getCategory",
  async (_, { rejectWithValue }) => {
    try {
      let config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      };

      const res = await axios.get("/categories", config);
      return res.data.data;
    } catch (error) {
      let err = errorHandler(error);
      return rejectWithValue(err);
    }
  }
);

export const addCategory = createAsyncThunk(
  "category/addCategory",
  async (data, { rejectWithValue }) => {
    try {
      let config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      };

      const res = await axios.post("/categories", data, config);
      toast.success("Category added successfully");
      return res.data.data;
    } catch (err) {
      let error = errorHandler(err);
      return rejectWithValue(error);
    }
  }
);

export const updateCategory = createAsyncThunk(
  "category/updateCategory",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      };

      const res = await axios.put(`/categories/category/${id}`, data, config);
        toast.success("Category updated successfully");

      return res.data.data;
    } catch (error) {
      let err = errorHandler(error);
      return rejectWithValue(err);
    }
  }
);
export const deleteCategory = createAsyncThunk(
  "category/deleteCategory",
  async ({ id }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      };

      const res = await axios.delete(`/categories/category/${id}`, config);
      toast.success("Category deleted successfully");

      return res.data.data;
    } catch (error) {
      let err = errorHandler(error);
      return rejectWithValue(err);
    }
  }
);
