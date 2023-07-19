import React from "react";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function HeroSection() {

  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <div className="flex flex-col-reverse md:flex-row flex-1 w-full h-full">
      {/* Left Section */}
      <section className="bg-primary flex flex-col flex-1 space-y-5 xl:space-y-10 w-full min-w-full max-w-full md:w-[50%] md:max-w-[50%] md:min-w-[50%] py-6 md:py-0  px-5  md:px-10 xl:px-20 justify-center">
        <p className="text-3xl md:text-5xl font-heading">
          Service Levels Promised And{" "}
          <span className="text-secondary">Delivered</span> By Experts
        </p>
        <p className="font-text text-text xl:text-xl">
          A marketplace to exchange services and get paid. It's all in few
          clicks to get day to day tasks done, save time!
        </p>
        <p className="font-text text-text xl:text-xl">
          verified and ranked by the users. A service of any size, amount, and
          terms, all covered and delivered
        </p>
        {userInfo?._id === undefined && <div className="flex">
          <Button onClick={()=>navigate("/register")} text={"Join Now"} style={{ width: 150 }} />
        </div>}
      </section>
      <section className="flex-1 flex bg-bannerImg bg-no-repeat bg-cover bg-center"></section>
    </div>
  );
}

export default HeroSection;
