import React from "react";
import DollarCircle from "../Svgs/DollarCircle";
import { LockClock, Star, StarOutline } from "@mui/icons-material";
import Button from "./Button";
import { baseURL } from "../api/axios";
import Loading from "./Loading";

function FreelancerCard(props) {
  return (
    <div className="flex flex-col rounded-lg bg-primary shadow-sm hover:shadow-md space-y-3">
      <div className="flex-1 flex object-cover w-full min-h-[150px] max-h-[150px]">

        <img
          src={
            props?.background
           ? `${baseURL}/upload/image/${props.background}`
           : require("../images/backgroundPlaceholder.jpg")
          }
          alt="background"
          className="w-full h-full rounded-t-lg"
        />
      </div>
      <div className="flex-1 flex flex-col space-y-6  p-5">
        <div className="flex flex-row items-center space-x-3">
         <img
            src={
              props?.avatar
                ? `${baseURL}/upload/image/${props.avatar}`
                : require("../images/placeholder.png")
            }
            alt="avatar"
            className="w-16 h-16 rounded-full"
          />
          <p className="font-heading text-black text-lg">{props.name}</p>
        </div>
        <div className="flex flex-col space-y-5">
          <p className="font-heading text-lg text-[#000]">{props.title}</p>
          <p className="font-text text-text max-w-[90%] line-clamp-3">
            {props.bio}
          </p>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex space-x-2 text-text font-heading">
            <StarOutline className="text-[orange]" />
            {props.avgRating || 0}
          </div>
          <Button
            onClick={() => props.onView(props._id)}
            style={{
              paddingLeft: 25,
              paddingRight: 25,
              borderWidth: 1,
              borderColor: "#3276FA",
              backgroundColor: "#fff",
              color: "#3276FA",
              borderRadius: 5,
            }}
            text="View Profile"
          />
        </div>
      </div>
    </div>
  );
}

export default FreelancerCard;
