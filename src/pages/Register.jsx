import React, { useEffect } from "react";
import OAuthButton from "../components/OAuthButton";
import Google from "../Svgs/Google";
import {
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  TextField,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import SideSectionSlide from "../components/SideSectionSlide";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../redux/slices/auth/authActions";
import axios from "../api/axios";

function Register() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const { loading, userInfo, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Password Input Handlers ===========
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  //= ================================

  // Confirm Password Input Handlers ===========
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);
  const handleMouseDownConfirmPassword = (event) => {
    event.preventDefault();
  };
  // ===========================================

  // ==================Google Login Handler==================

  const handleGoogleSignup = async () => {
    window.location.href = `${axios.defaults.baseURL}/auth/google`;
  };

  //================================================================

  const handleSubmit = (e) => {
    e.preventDefault();
    let data = {
      name: e.target.name.value,
      email: e.target.email.value,
      password: e.target.password.value,
      phoneNo: e.target.phone.value,
    };
    if (data.password !== e.target.confirmPassword.value) {
      toast.error("Password and Confirm Password do not match");
      return;
    }
    dispatch(registerUser(data)).then((res) => {
      if (registerUser.fulfilled.match(res)) {
        navigate("/onboarding");
      }
    });
  };

  return (
    <div className="flex-1 flex flex-col-reverse md:flex-row overflow-y-auto">
      <section className="flex flex-col flex-1 justify-center space-y-7 px-5 md:px-11 xl:px-32 max-w-full md:max-w-[45%] xl:max-w-[40%] mt-5 md:mt-0">
        {/* Text Section */}
        <div className="space-y-3">
          <p className="font-heading text-heading">Create New Account</p>
          <p className="font-text text-text">
            Help us get to know you from the information you provide to get free
            access to jofind.
          </p>
        </div>
        {/* form section */}
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <TextField
            id="standard-basic"
            label="Username"
            variant="standard"
            name="name"
            required
          />
          <TextField
            name="email"
            id="standard-basic"
            type="email"
            label="Email address"
            variant="standard"
            required
          />
          {/* Password Input */}
          <FormControl sx={{}} variant="standard">
            <InputLabel htmlFor="standard-adornment-password">
              Password
            </InputLabel>
            <Input
              required
              id="standard-adornment-password"
              type={showPassword ? "text" : "password"}
              name="password"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          {/* Confirm Password Input */}
          <FormControl sx={{}} variant="standard">
            <InputLabel htmlFor="standard-adornment-password">
              Confirm Password
            </InputLabel>
            <Input
              required
              name="confirmPassword"
              id="standard-adornment-password"
              type={showConfirmPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowConfirmPassword}
                    onMouseDown={handleMouseDownConfirmPassword}
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <TextField
            required
            name="phone"
            id="standard-basic"
            label="Phone Number"
            variant="standard"
          />
          <Button
            type="submit"
            loading={loading}
            style={{ marginTop: 30 }}
            text="Submit"
          />
        </form>
        {/* Link to Login section */}
        <div className="flex justify-center">
          <p className="text-text font-text">
            ALready have an Account?{" "}
            <Link
              to="/login"
              className="text-secondary font-heading cursor-pointer"
            >
              Login
            </Link>
          </p>
        </div>
        {/* Oauth Section */}
        <div className="flex flex-col space-y-5">
          <OAuthButton
            onClick={handleGoogleSignup}
            ICON={Google}
            text="Signup with Google"
          />
        </div>
      </section>
      <SideSectionSlide />
    </div>
  );
}

export default Register;
