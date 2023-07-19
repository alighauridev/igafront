import { createAsyncThunk } from "@reduxjs/toolkit";
import { errorHandler } from "../../erroHandler";
import axios from "../../../api/axios";
import { toast } from "react-toastify";

export const createBid = createAsyncThunk(
  "bid/createBid",
  async ({ jobId,  budget, days, description=null }, { rejectWithValue }) => {
    try {
      let config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      };

      const res = await axios.post(
        `/bids/job/${jobId}`,
        { budget, days, description },
        config
      );
      toast.success("Bid created successfully");
      return res.data.data;
    } catch (err) {
      let error = errorHandler(err);
      return rejectWithValue(error);
    }
  }
);

export const getMyBids = createAsyncThunk(
  "bid/getBids",
  async ({limit=10,cursor=null}, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      };

      const res = await axios.get(`/bids/myBids?${'limit='+limit}${cursor ? '&cursor='+cursor : ''}`, config);

      return res.data.data;
    } catch (err) {
      let error = errorHandler(err);
      return rejectWithValue(error);
    }
  }
);


export const bidStatusUpdate = createAsyncThunk(
  "bid/statusUpdate",
  async ({ bidId, status }, { rejectWithValue }) => {
    try{

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      };

      const res = await axios.put(`/bids/bid/${bidId}`,{status},config)
      toast.success(`Bid ${status} successfully`);
      return res.data.data


    }catch(err){
      let error = errorHandler(err);
      return rejectWithValue(error)
    }
  })


