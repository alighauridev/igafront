import { configureStore } from "@reduxjs/toolkit";


import authReducer from "./slices/auth/authSlice";
import jobReducer from "./slices/job/jobSlice";
import categoryReducer from "./slices/category/categorySlice";
import bidReducer from "./slices/bid/bidSlice";
import myJobReducer from "./slices/myJob/myJobSlice";
// import { authApi } from "./services/auth/authService";
import countReducer from "./slices/count/countSlice";
import freelancerReducer from "./slices/freelancer/freelancerSlice"
import statsReducer from "./slices/stats/statsSlice"

const store = configureStore({
  reducer: {
    auth: authReducer,
    // [authApi.reducerPath]: authApi.reducer,
    jobs: jobReducer,
    freelancers: freelancerReducer,
    myJobs: myJobReducer,
    category: categoryReducer,
    bid: bidReducer,
    count: countReducer,
    stats: statsReducer,
  },
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware().concat(authApi.middleware),
});

export default store;
