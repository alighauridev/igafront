import React, { useEffect } from "react";
import OAuthButton from "../components/OAuthButton";
import Google from "../Svgs/Google";
import {
  Checkbox,
  FormControlLabel,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  TextField,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import SideSectionSlide from "../components/SideSectionSlide";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../redux/slices/auth/authActions";
import axios from "../api/axios";
import { setCredentials } from "../redux/slices/auth/authSlice";
import { toast } from "react-toastify";

function Login() {
  const { loading, userInfo, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const user = queryParams.get("user");
  const accessToken = queryParams.get("accessToken");
  const refreshToken = queryParams.get("refreshToken");
  const googleError = queryParams.get("error");
  const [showPassword, setShowPassword] = React.useState(false);

  // Password Input
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  //===============

  //handler for login button
  const handleLocalLogin = (e) => {
    e.preventDefault();

    //set remember me cookie
    if (e.target.rememberMe.checked) {
      document.cookie = `rememberMe=true; max-age=${30 * 24 * 60 * 60}`;
    } else {
      document.cookie = `rememberMe=false; max-age=${30 * 24 * 60 * 60}`;
    }

    dispatch(
      userLogin({
        email: e.target.email.value,
        password: e.target.password.value,
      })
    ).then((res) => {
      if (userLogin.fulfilled.match(res)) {
        if (!res.payload.user.onBoarding) {
          navigate("/onboarding");
        } else {
          if (res.payload.user.role === "Buyer") {
            navigate("/Freelancers");
          } else if (res.payload.user.role === "Freelancer") {
            navigate("/Jobs");
          }
        }
      }
    });
  };
  //===============

  // ==================Google Login Handler==================

  const handleGoogleLogin = async () => {
    window.location.href = `${axios.defaults.baseURL}/auth/google`;
  };

  useEffect(() => {
    if (user && accessToken && refreshToken) {
      dispatch(setCredentials({ user, accessToken, refreshToken }));
    } else if (googleError) {
      toast.error("Google Login Failed");
    }
  }, []);

  useEffect(() => {
    if (userInfo?._id !== undefined) {
      if (userInfo?.role === "Admin") {
        navigate("/dashboard");
      } else if (userInfo?.onBoarding) {
        if (userInfo.role === "Buyer") {
          navigate("/Freelancers");
        } else if (userInfo.role === "Freelancer") {
          navigate("/Jobs");
        }
      } else {
        navigate("/onboarding");
      }
    }
  }, [userInfo]);

  //================================================================

  return (
    <div className="flex-1 flex flex-col-reverse md:flex-row overflow-y-auto">
      <section className="flex flex-col flex-1 justify-center space-y-7 px-5 md:px-11 xl:px-32 max-w-full md:max-w-[45%] xl:max-w-[40%] mt-5 md:mt-0">
        {/* Text Section */}
        <div className="space-y-3">
          <p className="font-heading text-heading">Welcome to IGAP.</p>
          <p className="font-text text-text">
            Continue with google or enter your account IGAP
          </p>
        </div>
        {/* Oauth Section */}
        <div className="flex flex-col space-y-5">
          <OAuthButton
            onClick={handleGoogleLogin}
            ICON={Google}
            text="Login with Google"
          />
        </div>
        {/* Or Section */}
        <div className="flex flex-row items-center space-x-3">
          <div className="h-0 flex-1 border border-[#0000005d] " />
          <p className="font-text text-text">Or login with account IGAP</p>
          <div className="h-0 flex-1 border border-[#0000005d]" />
        </div>
        {/* form section */}
        <form onSubmit={handleLocalLogin} className="flex flex-col space-y-4">
          <TextField
            id="standard-basic"
            label="email"
            type="email"
            variant="standard"
            name="email"
            required
          />
          {/* Password Input */}
          {/* <FormControl sx={{}} variant="standard"> */}
          <InputLabel htmlFor="standard-adornment-password">
            Password
          </InputLabel>
          <Input
            id="standard-adornment-password"
            type={showPassword ? "text" : "password"}
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
            name="password"
            required
          />
          {/* </FormControl> */}
          <div className="flex justify-between items-center">
            <FormControlLabel
              control={<Checkbox name="rememberMe" />}
              label="Remember me"
            />
            <p className="text-secondary font-heading cursor-pointer">
              Forgot password?
            </p>
          </div>
          <Button type={"submit"} loading={loading} text="Login" />
        </form>
        {/* Link to Register section */}
        <div className="flex justify-center">
          <p className="text-text font-text">
            Join with us?{" "}
            <Link
              to="/Register"
              className="text-secondary font-heading cursor-pointer"
            >
              Create account it's free
            </Link>
          </p>
        </div>
        {/* Terms of use Link section */}
        <div className="text-center text-text font-text">
          <p>
            By continuing, you agree to jofind Term of Use and confirm that you
            have read Privacy Policy
          </p>
        </div>
      </section>
      <SideSectionSlide />
    </div>
  );
}

export default Login;
