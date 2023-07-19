import React from "react";
import Star from "../Svgs/Star";
import Support from "../Svgs/Support";
import Coin from "../Svgs/Coin";
import Circle from "../Svgs/Circle";
import Person from "../images/Person.png";

const Row = (props) => {
  return (
    <div className="flex flex-col md:flex-row items-center md:items-start space-x-5">
      <div className="self-start">
        <props.icon />
      </div>
      <div className="flex flex-col space-y-3">
        <p className="text-lg font-heading text-white font-medium">
          {props.heading}
        </p>
        <p className="tetx-white text-text font-text">{props.text}</p>
      </div>
    </div>
  );
};

function PromotionCard(props) {
  return (
    <div
      style={props.style}
      className="flex flex-1 rounded-3xl bg-[#021638]  text-white"
    >
      <section className="flex flex-1 flex-col space-y-5 py-10 pl-5 pr-5 md:py-24 md:pl-24">
        <p className="text-text font-text text-white">For Clients</p>
        <p className="text-heading font-heading font-medium text-white">
          Why Businesses Turn To IGAP
        </p>
        <div className="flex flex-col flex-1 space-y-10">
          <Row
            heading="Proof of quality"
            text="Check any pro’s work samples, client reviews, and identity verification."
            icon={Star}
          />
          <Row
            heading="Safe and secure"
            text="Focus on your work knowing we help protect your data and privacy. We’re here with 24/7 support if you need it."
            icon={Support}
          />
          <Row
            heading="No cost until you hire"
            text="Interview potential fits for your job, negotiate rates, and only pay for work you approve."
            icon={Coin}
          />
        </div>
      </section>
      <section className="flex-1 relative hidden md:flex">
        <div className="absolute top-0 right-0">
          <Circle />
        </div>
        <div className="relative flex-1  flex justify-end items-end bottom-0 ">
          <img
            className="w-[80%] xl:w-[60%]"
            src={Person}
            alt="person"
          />
        </div>
      </section>
    </div>
  );
}

export default PromotionCard;
