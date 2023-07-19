import React from "react";
import BriefCase from "../Svgs/BriefCase";
import { Link, useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";
import Button from "./Button";
import { Menu } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { baseURL } from "../api/axios";
import { logout } from "../redux/slices/auth/authSlice";

function Header() {
  const [menu, setMenu] = React.useState(false);
  const [linksMenu, setLinksMenu] = React.useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, userInfo, error } = useSelector((state) => state.auth);


  return (
    <nav className="flex justify-between p-3 flex-col space-y-4 md:flex-row md:space-y-0 border-b border-[#D5D5D5]">
      {/* Left Side */}
      <div className="flex items-center justify-between flex-[2]">
        {/* Logo section */}
        <div
          onClick={() => navigate("/")}
          className="flex items-center space-x-2 cursor-pointer"
        >
          <BriefCase />
          <p className="font-heading text-heading text-[#000]">IGAP!</p>
        </div>

        {/* Links Section */}
        <div className="block md:hidden relative" onClick={()=>setLinksMenu(!linksMenu)}>
          <Menu />
        {linksMenu && <div className={`w-[100px] absolute top-full right-2 flex flex-col bg-primary text-black font-text text-text shadow-md `}>
          {userInfo.role==="Admin" && <Link to="/Dashboard">Dashboard</Link>}
          {userInfo.role==="Admin" && <Link to="/Categories">Categories</Link>}
          {(userInfo.role==="Buyer" || userInfo?.role==="Admin") && <Link to="/Freelancers">Find Talent</Link>}
          {(userInfo.role==="Buyer" ) && <Link to="/Jobs">My Jobs</Link>}
          {(userInfo.role==="Freelancer" || userInfo?.role==="Admin") && <Link to="/Jobs">Jobs</Link>}
          <Link to="/aboutus">About Us</Link>
        </div>}
        </div>
        <div className="flex-1 hidden md:flex justify-center items-center space-x-6 font-heading text-base">
          {userInfo.role==="Admin" && <Link to="/Dashboard">Dashboard</Link>}
          {userInfo.role==="Admin" && <Link to="/Categories">Categories</Link>}
          {(userInfo.role==="Buyer" || userInfo?.role==="Admin") && <Link to="/Freelancers">Find Talent</Link>}
          {(userInfo.role==="Buyer" ) && <Link to="/Jobs">My Jobs</Link>}
          {(userInfo.role==="Freelancer" || userInfo?.role==="Admin") && <Link to="/Jobs">Jobs</Link>}
          <Link to="/aboutus">About Us</Link>
        </div>

        {/* Search Bar */}
        {/* <div className="flex flex-1">
          <SearchBar />
        </div> */}
      </div>

      {/* Right Side */}
      { userInfo?._id === undefined ? (
        <div className="flex flex-1 justify-start md:justify-center space-x-6">
          <Button
            text={"login"}
            style={{
              paddingLeft: 30,
              paddingRight: 30,
              borderRadius: 30,
              borderWidth: 1,
              borderColor: "#3276FA",
              backgroundColor: "white",
              color: "#3276FA",
            }}
            onClick={() => navigate("/login")}
          />
          <Button
            text={"Sign Up"}
            style={{ paddingLeft: 30, paddingRight: 30, borderRadius: 30 }}
            onClick={() => navigate("/register")}

          />
        </div>
      ) : (
        <div className="flex flex-1 items-center justify-center space-x-6">
          <div
            onClick={() => setMenu(!menu)}
            className="flex items-center justify-center rounded-full w-12 h-12 border relative"
          >
            <Menu />
            {menu && (
              <div className="w-[100px] absolute top-full flex flex-col bg-primary text-black font-text text-text shadow-md">
                {userInfo.role==="Freelancer" && <Link className="text-center p-2 " to="/mybids">
                  My Bids
                </Link>}
                {userInfo.role ==="Freelancer" &&  <Link className="text-center p-2 " to="/myjobs">
                  My Jobs
                </Link>}
                {userInfo.role ==="Buyer" &&  <Link className="text-center p-2 " to="/createjob">
                  Create Job
                </Link>}
                {userInfo?._id !== undefined && <p className="text-center p-2 " onClick={()=>dispatch(logout())}>Logout</p>}
              </div>
            )}
          </div>
          <div
            onClick={() => navigate("/Profile")}
            className="flex rounded-full w-12 h-12 border object-contain"
          >
            <img
              className="w-12 h-12 rounded-full"
              src={userInfo?.avatar ? `${baseURL}/upload/image/${userInfo.avatar}` : require("../images/placeholder.png")}
              alt="profile"
            />
          </div>
        </div>
      )}
    </nav>
  );
}

export default Header;
