import React from "react";
import DollarCircle from "../Svgs/DollarCircle";
import { LockClock, Star, StarOutline } from "@mui/icons-material";
import Button from "./Button";
import { baseURL } from "../api/axios";
import { useSelector } from "react-redux";

function BidCard(props) {
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <div className="flex flex-col rounded-lg bg-primary shadow-sm hover:shadow-md p-5 space-y-6">
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-1 flex-row space-x-5">
          <div className="flex">
            <DollarCircle />
          </div>
          <div className="flex flex-1 flex-col">
            <p className="font-heading text-lg text-[#000]">
              {props?.job?.title}
            </p>
            <p className="font-text text-text max-w-[90%] line-clamp-2">
              {props?.description || "No Description Provided"}
            </p>
          </div>
        </div>
        <div className="flex">
          <p className="font-heading text-lg text-[#000]">{props.budget}</p>
        </div>
      </div>
      <div className="flex flex-1 justify-between items-end">
        <div className="flex flex-col space-y-2">
          <p className="font-heading text-white text-center py-2 rounded-md bg-secondary">
            {props?.status}
          </p>
          <p className="font-heading text-text">
            Bid On: {new Date(props.createdAt).toLocaleDateString()}
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <p className="font-heading text-base text-[#000]">
            {props?.freelancer?.name}
          </p>
          <img
            src={
              props?.freelancer?.avatar
                ? `${baseURL}/upload/image/${props.freelancer.avatar}`
                : require("../images/placeholder.png")
            }
            alt="avatar"
            className="w-8 h-8 rounded-full"
          />
        </div>
      </div>
      {userInfo?.role === "Buyer" && props?.status === "pending" && (
        <div className="flex items-center justify-end space-x-5">
          <Button
            text="Cancel"
            onClick={() => props.onCancel(props._id)}
            style={{
              backgroundColor: "#fff",
              color: "#3276FA",
              borderWidth: 1,
              borderColor: "#3276FA",
              paddingLeft: 25,
              paddingRight: 25,
              borderRadius: 5,
            }}
          />
          <Button
            text="Accept"
            onClick={() => props.onAccept(props._id)}
            style={{
              backgroundColor: "#fff",
              color: "#3276FA",
              borderWidth: 1,
              borderColor: "#3276FA",
              paddingLeft: 25,
              paddingRight: 25,
              borderRadius: 5,
            }}
          />
        </div>
      )}
    </div>
  );
}

export default BidCard;
