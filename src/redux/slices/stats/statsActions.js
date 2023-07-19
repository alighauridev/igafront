import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../api/axios";
import { errorHandler } from "../../erroHandler";

export const getStats = createAsyncThunk(
    'stats/get',
    async (_, { rejectWithValue }) => {
        try {

            let config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
                },

            }

            const res = await axios.get('/stats',config);
            return res.data.data;
        } catch (error) {
            let err = errorHandler(error);
            return rejectWithValue(err);
        }
    }
)

