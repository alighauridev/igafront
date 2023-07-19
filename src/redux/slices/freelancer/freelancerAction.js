// import axios from 'axios'
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../api/axios";
import { errorHandler } from "../../erroHandler";
import { toast } from "react-toastify";


export const getFreelancers = createAsyncThunk(
  "freelancer/all",
  async ({limit=10, cursor =null}, { rejectWithValue }) => {
    try {

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      };

      const res = await axios.get(`/freelancer/all?${limit&&'limit='+limit}${cursor ? '&cursor='+cursor : ''}`, config);
      return res.data.data;
    } catch (err) {
      let error = errorHandler(err);
      return rejectWithValue(error);
    }
  }
);

export const getFreelancerById = createAsyncThunk(
  "Freelancer/getFreelancerById",
  async (id, { rejectWithValue }) => {
    try {
      console.log(id);
      let config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      };
      const res = await axios.get(`/freelancer/${id}`, config);
      return res.data;
    } catch (err) {
      let error = errorHandler(err);
      return rejectWithValue(error);
    }
  }
);




