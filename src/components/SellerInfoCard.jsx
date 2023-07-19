import {
  BusinessCenterOutlined,
  LocationOnOutlined,
} from "@mui/icons-material";
import React from "react";
import DollarCircle from "../Svgs/DollarCircle";
import Button from "./Button";
import { baseURL } from "../api/axios";

function SellerInfoCard(props) {
  return (
    <div
      style={props.style}
      className="p-12 rounded-xl bg-primary shadow-sm flex flex-col space-y-8"
    >
      <p className="font-heading text-heading text-xl">About this Seller</p>
      <img
        crossOrigin="anonymous"
        className="rounded-full w-14 h-14"
        src={props?.avatar ? `${baseURL}/upload/image/${props.avatar}` : require("../images/placeholder.png")}
        alt="person"
      />
      <p className="font-heading text-heading text-xl">{props.name}</p>
      <div className="flex flex-col space-y-5">
        <div className="flex items-center space-x-3">
          <LocationOnOutlined className="text-text" />
          <p className="font-text text-text">
            {props.location || "Not Specified"}
          </p>
        </div>
        {/* <div className='flex items-center space-x-3'>
                <DollarCircle className='text-text' />
                <p className='font-text text-text'><span className='text-black'>{props.totalSpends}</span> Total Spends</p>
            </div> */}
        <div className="flex items-center space-x-3">
          <BusinessCenterOutlined className="text-text" />
          <p className="font-text text-text">
            <span className="text-black">{props.completedJobs || 0}</span> Jobs
            Done
          </p>
        </div>
      </div>
      <div className="flex flex-col space-y-5">
        <p className="font-text text-text">
          Company{" "}
          <span className="text-black">
            {props.companyName || "Not Specified"}
          </span>
        </p>
        <p className="text-text font-text">
          Member since {props?.createdAt?.split("-")[0]}
        </p>
      </div>
      <div className="py-11 flex-1">
        <Button text="Contact" />
      </div>
    </div>
  );
}

export default SellerInfoCard;
