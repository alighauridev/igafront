import React from "react";
import DollarCircle from "../Svgs/DollarCircle";
import { AccessTime, LockClock, Star, StarOutline } from "@mui/icons-material";
import Button from "./Button";
import { baseURL } from "../api/axios";

function JobStatusCard(props) {
  return (
    <div
      onClick={() => props.handleClick(props._id)}
      className="flex flex-col rounded-lg bg-primary shadow-sm hover:shadow-md space-y-3"
    >
      <div className="flex-1 flex flex-col space-y-6  p-5">
        <div className="flex flex-row items-center space-x-3">
          <img
            src={
              props.buyer?.avatar
                ? `${baseURL}/upload/image/${props.buyer.avatar}`
                : require("../images/placeholder.png")
            }
            alt="avatar"
            className="w-16 h-16 rounded-full"
          />
          <p className="font-heading text-black text-lg">{props.name}</p>
        </div>
        <div className="flex flex-col space-y-5">
          <div className="flex flex-row items-center justify-between">
            <p className="font-heading text-lg text-[#000]">{props.title}</p>
            <div className="flex items-center justify-center rounded-3xl p-3 px-7 bg-[green] text-white">
              {props.status}
            </div>
          </div>
          <p className="font-text text-text max-w-[90%] line-clamp-3">
            {props.description}
          </p>
        </div>
        <div className="flex-1 flex items-end justify-between">
          <div className="flex flex-col text-text font-text space-y-2">
            <p>Due On</p>
            <div className="flex flex-row items-center space-x-2">
              <div className="flex items-center space-x-2">
                <AccessTime className="text-text" />
                <p>
                  {new Date(
                    new Date().setDate(
                      new Date(props.createdAt).getDate() + props.days
                    )
                  ).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-row items-center space-x-5">
            <div className="flex flex-row items-center space-x-2">
              <DollarCircle className="text-text" />
              <p>{props.budget}</p>
            </div>
            <div className="flex flex-row items-center space-x-2">
              <AccessTime className="text-text" />
              <p>{props.days}/Days</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobStatusCard;
