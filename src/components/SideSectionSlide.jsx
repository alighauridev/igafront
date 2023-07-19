import React from "react";
import TextSlider from "../components/TextSlider";
import Navbrand from "../Svgs/Navbrand";

function SideSectionSlide() {
  const textData = [
    {
      title: "Your job application is processed 3x faster.",
      description:
        "By using the igap platform, it can help you get your dream job and job calls faster.",
    },
    {
      title: "One platform for multiple solutions.",
      description:
        "We are committed to improving the quality of our services, for the sake of creating solutions.",
    },
    {
      title: "Find your dream job 3",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eget augue nec massa volutpat aliquam fringilla non.",
    },
  ];

  return (
    <section className="flex-1 flex flex-col justify-between bg-sign bg-no-repeat bg-cover p-page-y px-5 lg:px-20">
      <div className="flex w-full justify-end">
        <Navbrand style={{ width: "76px", height: "49px" }} />
      </div>
      <div className="flex w-full  py-6">
        <TextSlider data={textData} />
      </div>
    </section>
  );
}

export default React.memo(SideSectionSlide);
