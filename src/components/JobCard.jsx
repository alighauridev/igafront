import React from "react";
import DollarCircle from "../Svgs/DollarCircle";
import { LockClock, Star, StarOutline } from "@mui/icons-material";
import Button from "./Button";

function JobCard(props) {
  return (
    <div className="flex flex-col rounded-lg bg-primary shadow-sm hover:shadow-md p-5 space-y-6">
      <div className="flex flex-col space-y-5">
        <p className="font-heading text-lg text-[#000]">{props.title}</p>
        <p className="font-text text-text max-w-[90%] line-clamp-3">{props.description}</p>
        <div className="flex flex-row items-center space-x-8">
          <div className="flex items-center space-x-2">
            <DollarCircle />
            <p className="font-heading text-text text-black">{props.requestedBudget}</p>
          </div>
          <div className="flex items-center space-x-2">
            <LockClock />
            <p className="font-heading text-text text-black">
              {props.requestedDays}
              <span className="text-text">/Days</span>
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-1 items-end justify-end ">
          <Button onClick={()=>props.onView(props._id)} style={{paddingLeft:25, paddingRight:25, borderRadius:30}} text="view" />
      </div>
    </div>
  );
}

export default JobCard;
