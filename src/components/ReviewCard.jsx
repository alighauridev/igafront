import { Rating } from "@mui/material";
import React from "react";

function ReviewCard(props) {
  return (
    <div className="w-full flex flex-row p-5 rounded-lg bg-primary border border-border space-x-3">
      <img
        crossOrigin="anonymous"
        src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000"
        alt="avatar"
        className="w-16 h-16 rounded-full"
      />
      <div className="flex flex-col space-y-3">
        <p className="font-heading text-black text-lg">{props.name}</p>
        <div className="flex flex-row items-center space-x-2">
          <Rating name="read-only" value={props.rating} readOnly />
          <p className="font-text text-text">{props.rating}</p>
        </div>
        <p className="font-text text-text">{props.comment}</p>
      </div>
    </div>
  );
}

export default ReviewCard;
