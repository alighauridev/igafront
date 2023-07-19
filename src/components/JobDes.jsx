import {
  AttachFile,
  AttachFileOutlined,
  BusinessCenterOutlined,
  Flag,
  Person,
} from "@mui/icons-material";
import React from "react";
import Button from "./Button";
import { baseURL } from "../api/axios";
import { useSelector } from "react-redux";

function BidDetailItem(props) {
  return (
    <div
      style={props.style}
      className="flex flex-col border-0 md:border-r border-[#0000005a] flex-[2]"
    >
      <p className="font-text text-text">{props.title}</p>
      <div className="flex space-x-1">
        <props.icon className="text-text" />
        <p className="font-heading  text-black">{props.data}</p>
      </div>
    </div>
  );
}

function AboutRow(props) {
  return (
    <div className="flex flex-col space-y-3">
      <p style={props.titleStyle} className="font-heading text-black text-lg">
        {props.title}
      </p>
      <p className="font-text text-text">{props.data}</p>
    </div>
  );
}

function JobDes(props) {
  const { loading, userInfo, error } = useSelector((state) => state.auth);


  const handleAttachmentClick = (format, name) => {
    if (
      format === "image/png" ||
      format === "image/jpeg" ||
      format === "image/jpg" ||
      format.split("/")[0] === "image"
    ) {
      window.open(`${baseURL}/upload/image/${name}`);
    } else {
      //open pdf in new tab
      window.open(`${baseURL}/upload/pdf/${name}`);
    }
  };

  return (
    <div className="flex-1 flex flex-col space-y-10 p-5 rounded-xl bg-primary shadow-sm">
      <div className="space-y-3">
        <p className="font-heading text-heading">{props.title}</p>
        <div className="flex space-y-3 md:space-y-0 flex-col md:flex-row justify-between ">
          <p className="font-text text-text text-[#232222] max-w-[80%]">
            {props.description}
          </p>
          <p className="text-text font-text">
            Posted{" "}
            {Math.floor(
              (new Date() - new Date(props.createdAt)) / (1000 * 60 * 60 * 24)
            )}{" "}
            hours ago
          </p>
        </div>
      </div>
      {/* Bid Details Section */}
      <div className="flex flex-col md:flex-row border space-y-3 space-x-0 md:space-y-0 md:space-x-5 border-border p-5 rounded-lg">
        <BidDetailItem
          style={{ flex: 2 }}
          title="Bid"
          icon={Person}
          data={props.bids}
        />
        <BidDetailItem
          style={{ flex: 1 }}
          title="Business Field"
          icon={Flag}
          data={props.subCategory}
        />
        <BidDetailItem
          style={{ flex: 1, border: "none" }}
          title="Status"
          icon={BusinessCenterOutlined}
          data={props.status === "created" ? "Open" : props.status}
        />
      </div>
      {/* Bottom Text Section */}
      <div className="flex flex-col space-y-5">
        <AboutRow title="About this job" data={props.description} />
        <AboutRow title="Price" data={props.requestedBudget} />
        <AboutRow title="Days" data={props.requestedDays} />
        <div className="flex flex-col space-y-3">
          <p className="font-heading text-lg text-black">Attachments</p>
          {props.files && (
            <div className="flex flex-row space-x-3">
              <AttachFileOutlined className="text-text" />
              <div className="flex flex-col">
                {props.files.map((attachment) => (
                  <div
                    key={attachment.name.toString()}
                    className="flex flex-col space-x-0 space-y-3 md:space-y-0 mb-3 md:mb-0 md:flex-row md:space-x-3 cursor-pointer"
                  >
                    <p
                      onClick={() =>
                        handleAttachmentClick(
                          attachment.format,
                          attachment.name
                        )
                      }
                      className="font-text text-base text-secondary"
                    >
                      <span className="text-text">Name:</span> {attachment.name}
                    </p>
                    <p className="font-text text-text">
                      Type: {attachment.format}
                    </p>
                    <p className="font-text text-text">
                      Size: {attachment.size} MBs
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        {props.status==="delivered" && props.delivery &&
          (props?.buyer?.toString() === userInfo?._id?.toString() ||
            props?.buyer?._id.toString() === userInfo?._id?.toString() ||
            props?.freelancer?.toString() === userInfo?._id?.toString() ||
            props?.freelancer?._id.toString() ===
              userInfo?._id?.toString() || userInfo?.role==="Admin") && (
            <>
              <div className="w-full border-b bg-border" />

              <div className="flex flex-col space-y-3">
                <p className="font-heading text-lg text-black">Delivery</p>
                <AboutRow
                  titleStyle={{ fontSize: 12, color: "#565656c3" }}
                  title="Delivered on"
                  data={new Date(
                    props.delivery.deliveredAt
                  ).toLocaleDateString()}
                />
                <AboutRow
                  titleStyle={{ fontSize: 12, color: "#565656c3" }}
                  title="Note"
                  data={props.delivery.note}
                />
                {props.delivery?.files && (
                  <div className="flex flex-row space-x-3">
                    <AttachFileOutlined className="text-text" />
                    <div className="flex flex-col">
                      {props.delivery.files.map((attachment) => (
                        <div
                          key={attachment.name.toString()}
                          className="flex flex-col space-y-3 space-x-0 md:space-y-0 md:flex-row md:space-x-3 cursor-pointer"
                        >
                          <p
                            onClick={() =>
                              handleAttachmentClick(
                                attachment.format,
                                attachment.name
                              )
                            }
                            className="font-text text-base text-secondary"
                          >
                            <span className="text-text">Name:</span>{" "}
                            {attachment.name}
                          </p>
                          <p className="font-text text-text">
                            Type: {attachment.format}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        {props.status === "disputed" &&
          (props?.buyer?.toString() === userInfo?._id?.toString() ||
            props?.buyer?._id.toString() === userInfo?._id?.toString() ||
            props?.freelancer?.toString() === userInfo?._id?.toString() ||
            props?.freelancer?._id.toString() ===
              userInfo?._id?.toString() || userInfo?.role==="Admin") && (
            <>
              <div className="w-full border-b bg-border" />
              <AboutRow title="Dispute" data={props.disputeDescription} />
            </>
          )}
      </div>

      <div className="w-full border-b bg-border" />
      <div className="flex justify-end items-center space-x-5">
        {!props?.freelancer && userInfo?.role === "Freelancer" && (
          <Button
            style={{ paddingLeft: 20, paddingRight: 20, borderRadius: 20 }}
            text="Apply Now"
            onClick={() => props.onButtonClick("bid")}
          />
        )}
        {(props?.buyer?.toString() === userInfo?._id?.toString() ||
          props?.buyer?._id.toString() === userInfo?._id?.toString() ||
          props?.freelancer?.toString() === userInfo?._id?.toString() ||
          props?.freelancer?._id.toString() === userInfo?._id?.toString()) &&
          (props.status === "inprogress" || props.status === "delivered") && (
            <Button
              style={{ paddingLeft: 20, paddingRight: 20, borderRadius: 20 }}
              text="Dispute"
              onClick={() => props.onButtonClick("dispute")}
            />
          )}
        {props?.freelancer?.toString() === userInfo?._id?.toString() &&
          props.status === "inprogress" && (
            <Button
              style={{ paddingLeft: 20, paddingRight: 20, borderRadius: 20 }}
              text="deliver"
              onClick={() => props.onButtonClick("deliver")}
            />
          )}
        {props?.buyer?.toString() === userInfo?._id?.toString() &&
          ( props.status === "delivered") && (
            <Button
              loading={props.completeLoading}
              style={{ paddingLeft: 20, paddingRight: 20, borderRadius: 20 }}
              text="Mark as Complete"
              onClick={props.markComplete}
            />
          )}
        {props?.buyer?.toString() === userInfo?._id?.toString() &&
          (props.status === "created") && (
            <Button
              style={{ paddingLeft: 20, paddingRight: 20, borderRadius: 20 }}
              text="See Bids"
              onClick={props.seeBids}
            />
          )}
        {userInfo?.role==="Admin" &&
          (props.status === "disputed") && (
            <Button
              loading={props.completeLoading}
              style={{ paddingLeft: 20, paddingRight: 20, borderRadius: 20 }}
              text="Continue"
              onClick={props.adminContinue}
            />
          )}
        {userInfo?.role==="Admin" &&
          (props.status === "disputed") && (
            <Button
              style={{ paddingLeft: 20, paddingRight: 20, borderRadius: 20 }}
              text="Cancel"
              onClick={props.adminCancel}
            />
          )}
      </div>
    </div>
  );
}

export default JobDes;
