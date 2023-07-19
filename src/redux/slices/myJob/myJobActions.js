import { createAsyncThunk } from "@reduxjs/toolkit";
import { errorHandler } from "../../erroHandler";
import axios from "../../../api/axios";
import { toast } from "react-toastify";

export const getMyJobs = createAsyncThunk(
  "myJob/getMyJobs",
  async ({limit=10, cursor= null}, { rejectWithValue }) => {
    try {
      let config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      };

      const res = await axios.get(`/jobs/myJobs?${limit&&'limit='+limit}${cursor ? '&cursor='+cursor : ''}`, config);

      
      return res.data.data;
    } catch (err) {
      let error = errorHandler(err);
      return rejectWithValue(error);
    }
  }
);


export const createDisputeMy = createAsyncThunk(
  "job/updateJobStatus",
  async ({ jobId, status, disputeDescription }, { rejectWithValue }) => {
    try {
      let config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      };
      const res = await axios.put(
        `/jobs/${jobId}/dispute`,
        { status, disputeDescription },
        config
      );
      toast.success("Job status updated successfully");
      return res.data.data;
    } catch (err) {
      let error = errorHandler(err);
      return rejectWithValue(error);
    }
  }
);