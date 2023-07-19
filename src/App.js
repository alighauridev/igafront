import React from "react";
import Login from "./pages/Login";
import { Route, Router, Routes, useLocation } from "react-router-dom";
import Register from "./pages/Register";
import OnBoarding from "./pages/OnBoarding";
import Home from "./pages/Home";
import AllJobs from "./pages/AllJobs";
import Job from "./pages/Job";
import Profile from "./pages/Profile";
import Freelancers from "./pages/Freelancers";
import SellerProfile from "./pages/SellerProfile";
import Bids from "./pages/Bids";
import CreateJob from "./pages/CreateJob";
import Jobs from "./pages/Jobs";
import ProtectedRoute from "./ProtectedRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { setCredentials } from "./redux/slices/auth/authSlice";
import MyBids from "./pages/MyBids";
import Dashboard from "./pages/Dashboard";
import Category from "./pages/Category";


function App() {
  const location = useLocation();
  const dispatch = useDispatch();

  //to get usrer credentials after each refresh
  React.useEffect(() => {

    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      dispatch(setCredentials({data:foundUser}))
    }

  }, []);


  return (
    <div className="flex overflow-hidden w-full h-full bg-primary">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
          <Route path="/onboarding" element={<OnBoarding />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/Jobs" element={<AllJobs />} />
          <Route path="/Job/:id" element={<Job />} />
          <Route path="/Profile" element={<Profile />} />
        </Route>
        <Route element={<ProtectedRoute type="Buyer" />}>
          <Route path="/Freelancers" element={<Freelancers />} />
          <Route path="/SellerProfile/:id" element={<SellerProfile />} />
          <Route path="/CreateJob" element={<CreateJob />} />
          <Route path="/Job/:id/Bids" element={<Bids />} />
        </Route>
        <Route element={<ProtectedRoute type="Freelancer" />}>
          <Route path="/MyJobs" element={<Jobs />} />
          <Route path="/MyBids" element={<MyBids />} />
          
        </Route>
        <Route element={<ProtectedRoute type="Admin" />}>
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/Categories" element={<Category />} />
          
        </Route>
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
