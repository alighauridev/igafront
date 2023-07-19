import { Bookmark, MoreHoriz, Place } from "@mui/icons-material";
import React from "react";
import ReviewCard from "./ReviewCard";
import { baseURL } from "../api/axios";

function SellerInfo(props) {
  console.log("RPOPS: ", props);
  return (
    <div className="flex-1 flex flex-col rounded-lg bg-primary">
      {/* <div className='flex flex-col'> */}
      {/* Background Section */}
      <div className="w-full max-h-[200px] min-h-[200px] object-cover rounded-t-lg">
        <img
          src={
            props?.background ? `${baseURL}/upload/image/${props.background}` : require("../images/backgroundPlaceholder.jpg")
          }
          alt="background"
          className="w-full max-h-[200px] min-h-[200px] object-cover rounded-t-lg"
        />
      </div>
      <div className="flex flex-col space-y-5 p-5 relative -top-14 ">
        {/* Avatar Section */}
        <div className="flex flex-col space-y-4">
          <img
            src={props?.avatar ? `${baseURL}/upload/image/${props.avatar}`  : require("../images/placeholder.png")}
            alt="avatar"
            className="w-20 h-20 rounded-full"
          />
          <div className="flex flex-row items-center justify-between">
            <div className="flex flex-col space-y-1">
              <p className="font-heading text-black text-2xl">{props.name}</p>
              <div className="flex flex-row items-center">
                <p className="font-text text-secondary text-sm">
                  {props.title}
                </p>
                {props.location && (
                  <div className="flex flex-row items-center">
                    <Place className="text-text" />
                    <p className="font-text text-text text-sm">
                      {props.location}
                    </p>
                  </div>
                )}
              </div>
            </div>
            <div className="flex flex-row items-center space-x-3">
              <div className="flex items-center justify-center rounded-full p-3 border border-border cursor-pointer">
                <Bookmark className="text-text" />
              </div>
              <div className="flex items-center justify-center rounded-full p-3 border border-border cursor-pointer">
                <MoreHoriz className="text-text" />
              </div>
            </div>
          </div>
        </div>
        {/* About Serction */}
        <div className="flex flex-col space-y-3 py-7">
          <p className="font-heading text-black text-2xl">About Seller</p>
          <p className="font-text text-text">{props.bio}</p>
        </div>
        {/* Skill Serction */}
        <div className="flex flex-col space-y-3 py-7">
          <p className="font-heading text-black text-xl">Skill</p>
          <div className="flex flex-row flex-wrap ">
            {props?.skills?.map((skill, index) => (
              <div key={index} className="flex items-center justify-center p-2 bg-border rounded-md mr-3 my-3">
                <p className="font-text text-text">{skill}</p>
              </div>
            ))}
          </div>
        </div>
        {/* Review Section */}
        <div className="flex flex-col space-y-5">
          <p className="font-heading text-black text-xl">Some Recent Reviews</p>
          <div className="flex flex-col space-y-5">
            {props?.reviews?.map((review, index) => (
              <ReviewCard {...review} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SellerInfo;
