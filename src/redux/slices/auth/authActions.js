// import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from "../../../api/axios";
import { errorHandler } from '../../erroHandler';


export const userLogin = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      // configure header's Content-Type as JSON
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }

      const { data } = await axios.post(
        '/auth/login',
        { email, password },
        config
      )

      // store user's token in local storage
      localStorage.setItem('accessToken', data.accessToken)
      localStorage.setItem('refreshToken', data.refreshToken)
      localStorage.setItem('user', JSON.stringify(data.user))

      return data
    } catch (error) {
      let err = errorHandler(error);
      return rejectWithValue(err);
    }
  }
)


export const registerUser = createAsyncThunk(
  'user/register',
  async ({ name, email, password, interests, role, phoneNo }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }

      const {data} = await axios.post(
        '/auth/signup',
        { name, email, password, interests, role, phoneNo },
        config
      )
      localStorage.setItem('accessToken', data.accessToken)
      localStorage.setItem('refreshToken', data.refreshToken)
      localStorage.setItem('user', JSON.stringify(data.user))

      return data

    } catch (error) {
      let err = errorHandler(error);
      return rejectWithValue(err);
    }
  }
)
export const onBoarding = createAsyncThunk(
  'user/onboard',
  async (info, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      }

      const {data} = await axios.post(
        '/auth/onboard',
        {...info},
        config
      )
      localStorage.setItem('user', JSON.stringify(data.data))

      return data.data

    } catch (error) {
      let err = errorHandler(error);
      return rejectWithValue(err);
    }
  }
)

export const getUserProfile = createAsyncThunk(
  'user/profile',
  async (_, { rejectWithValue }) => {
  try{

    const res = await axios.get('/user/profile',{
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });
    
    localStorage.setItem('user', JSON.stringify(res.data.data));
    return res.data.data;

  }catch(error){
    let err = errorHandler(error);
    return rejectWithValue(err);
  }
  })

export const updateUserProfile = createAsyncThunk(
  'user/updateProfile',
  async (info, { rejectWithValue }) => {
    try{

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      };

      const res = await axios.put('/user/profile/update', {...info}, config);

      return res.data.data;


    }catch(error){
      let err = errorHandler(error);
      return rejectWithValue(err);
    }
  })
