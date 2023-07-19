import {
  BusinessCenterOutlined,
  LocationOnOutlined,
} from "@mui/icons-material";
import React from "react";
import DollarCircle from "../Svgs/DollarCircle";
import Button from "./Button";
import { baseURL } from "../api/axios";

function BuyerInfo(props) {
  return (
    <div
      style={props.style}
      className="p-12 rounded-xl bg-primary shadow-sm flex flex-col space-y-8"
    >
      <p className="font-heading text-heading text-xl">About this Client</p>
      <img
        crossOrigin="anonymous"
        className="rounded-full w-14 h-14"
        src={
          props.avatar
            ? `${baseURL}/upload/image/${props.avatar}`
            : require("../images/placeholder.png")
        }
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
        <div className="flex items-center space-x-3">
          <DollarCircle className="text-text" />
          <p className="font-text text-text">
            <span className="text-black">{props.totalSpent}</span> Total Spends
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <BusinessCenterOutlined className="text-text" />
          <p className="font-text text-text">
            <span className="text-black">{props.totalJobs}</span> Posted
          </p>
        </div>
      </div>
      <div className="flex flex-col space-y-5">
        <p className="font-text text-text">
          <span className="text-black">{props.hires}</span> Hires{" "}
          <span className="text-black">{props.active}</span> Actives
        </p>
        <p className="text-text font-text">
          Member since {props.createdAt?.split("-")[0]}
        </p>
      </div>
      <div className="py-11 flex-1">
        <Button text="Contact" />
      </div>
    </div>
  );
}

export default BuyerInfo;
