import React from "react";
import ArrowLeft from "../Svgs/ArrowLeft";
import Button from "./Button";

function StepContainer(props) {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const formref = React.useRef(null);
  const textRef = React.useRef(null);

  const handleClick = () => {
    if (currentIndex === props.textData.length - 1) {
      return;
    }
    setCurrentIndex((prev) => prev + 1);
    textRef.current.style.transition = `transform 0.5s ease-in-out`;
    textRef.current.style.transform = `translateX(-${
      (currentIndex + 1) * 100
    }%)`;
    formref.current.style.transition = `transform 0.5s ease-in-out`;
    formref.current.style.transform = `translateX(-${
      (currentIndex + 1) * 100
    }%)`;
  };

  const handleStepBack = () => {
    if (currentIndex === 0) {
      return;
    }
    setCurrentIndex((prev) => prev - 1);
    textRef.current.style.transition = `transform 0.5s ease-in-out`;
    textRef.current.style.transform = `translateX(-${
      (currentIndex - 1) * 100
    }%)`;
    formref.current.style.transition = `transform 0.5s ease-in-out`;
    formref.current.style.transform = `translateX(-${
      (currentIndex - 1) * 100
    }%)`;
  };


  const childrenWithProps = React.Children.map(props.children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {handleClick});
    }
    return child;
  });


  return (
    <div
      style={props.style}
      className="flex flex-col space-y-3 overflow-hidden"
    >
      <div className="mb-10 cursor-pointer" onClick={handleStepBack}>
        <ArrowLeft />
      </div>
      {/* Text section */}
      <div ref={textRef} className="flex">
        {props.textData.map((item, index) => (
          <div className="min-w-full space-y-5">
            <p className="font-heading text-heading">{item.heading}</p>
            <p className="text-text font-text">{item.description}</p>
          </div>
        ))}
      </div>
      {/* Steps Section */}
      <div style={{ marginBottom: 40 }} className="flex">
        {props.textData.map((item, index) => (
          <div className="w-full flex-1 flex items-center">
            <div
              className={`rounded-full w-12 h-12 flex justify-center items-center border ${
                currentIndex === index
                  ? "border-secondary bg-[#F0F7FF]"
                  : "border-border bg-white"
              }`}
            >
              <p
                className={`${
                  currentIndex === index ? "text-secondary" : "text-text"
                } font-heading`}
              >
                {index + 1}
              </p>
            </div>
            {index !== props.textData.length - 1 && (
              <div className="flex-1 h-1 bg-border"></div>
            )}
          </div>
        ))}
      </div>
      {/* Form Section */}
      <div ref={formref} className="flex box-border">
          {childrenWithProps}
      </div>
      {/* Button */}
      {/* <Button
        onClick={handleClick}
        text={currentIndex !== props.textData.length - 1 ? "Next" : "Save"}
      /> */}
    </div>
  );
}

export default StepContainer;
