// import axios from 'axios'
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../api/axios";
import { errorHandler } from "../../erroHandler";
import { toast } from "react-toastify";

export const createJob = createAsyncThunk(
  "job/create",
  async (
    {
      title,
      files,
      description,
      requestedDays,
      category,
      subCategory,
      requestedBudget,
    },
    { rejectWithValue }
  ) => {
    try {
      // configure header's Content-Type as JSON
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      };

      const { data } = await axios.post(
        "/jobs",
        {
          title,
          description,
          files,
          requestedDays,
          category,
          subCategory,
          requestedBudget,
        },
        config
      );
      toast.success("Job created successfully");
      return data.data;
    } catch (error) {
      let err = errorHandler(error);
      return rejectWithValue(err);
    }
  }
);

export const getJobs = createAsyncThunk(
  "job/getJobs",
  async ({limit=10,cursor=null}, { rejectWithValue }) => {
    try {
      // let queryString = "";

      // if (filter.category) {
      //   queryString += `category=${filter.category}&`;
      // }
      // if (filter.subCategory) {
      //   queryString += `subCategory=${filter.subCategory}&`;
      // }
      // if (filter.createdAt) {
      //   queryString += `createdAt=${filter.createdAt}`;
      // }

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      };

      const res = await axios.get(`/jobs?'${limit&&'limit='+limit}${cursor ? '&cursor='+cursor : ''}`, config);
      return res.data.data;
    } catch (err) {
      let error = errorHandler(err);
      return rejectWithValue(error);
    }
  }
);

export const getJobById = createAsyncThunk(
  "job/getJobById",
  async (id, { rejectWithValue }) => {
    try {
      let config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      };
      const res = await axios.get(`/jobs/job/${id}`, config);
      return res.data.data;
    } catch (err) {
      let error = errorHandler(err);
      return rejectWithValue(error);
    }
  }
);

export const getBidsonAJob = createAsyncThunk(
  "bid/getBidsonAJob",
  async ({ jobId }, { rejectWithValue }) => {
    try {
      console.log(jobId);
      let config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      };

      const res = await axios.get(`/bids/job/${jobId}`, config);

      return res.data.data;
    } catch (err) {
      let error = errorHandler(err);
      return rejectWithValue(error);
    }
  }
);

export const jobDelivery = createAsyncThunk(
  "job/jobDelivery",
  async ({ jobId, files, note }, { rejectWithValue }) => {
    try {
      let config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const res = await axios.put(
        `/jobs/job/${jobId}`,
        { files, note },
        config
      );
      toast.success("Job delivered successfully");
      return res.data.data;
    } catch (err) {
      let error = errorHandler(err);
      return rejectWithValue(error);
    }
  }
);

export const createDispute = createAsyncThunk(
  "job/createDispute",
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

export const updateJob = createAsyncThunk(
  "job/updateJob",
  async ({ jobId, status }, { rejectWithValue }) => {
    try {
      let config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      };
      const res = await axios.put(
        `/jobs/${jobId}/update/status`,
        { status },
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


