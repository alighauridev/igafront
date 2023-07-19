import React, { useEffect } from "react";

function TextSlider(props) {
  const sliderRef = React.useRef(null);
  const [currentIndex, setCurrentIndex] = React.useState(0);

  useEffect(() => {
    setTimeout(() => {
      if (sliderRef.current !== null) {
        if (currentIndex === props.data.length - 1) {
          setCurrentIndex(0);
          sliderRef.current.style.transition = `none`;
          sliderRef.current.style.transform = `translateX(0%)`;
        } else {
          setCurrentIndex((prev) => prev + 1);
          //slide in the next item while sliding out the current item
          sliderRef.current.style.transform = `translateX(-${
            (currentIndex + 1) * 100
          }%)`;
          sliderRef.current.style.transition = `transform 0.5s ease-in-out`;
        }
      }
    }, 4000);

    return () => {
      clearTimeout();
    };
  }, [currentIndex]);

  return (
    <div
      style={props.style}
      className="flex flex-col space-y-10 overflow-hidden"
    >
      <div ref={sliderRef} className="flex min-w-full">
        {props.data.map((item, index) => (
          <div
            key={index.toString()}
            className="flex flex-col flex-1 min-w-full space-y-10"
          >
            <div className="text-white min-w-full space-y-5">
              <p
                style={props.textStyle}
                className="font-heading text-white text-2xl"
              >
                {item.title}
              </p>
              <p
                style={props.textStyle}
                className="font-text text-text text-white"
              >
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex space-x-4">
        {props.data.map((item, index) => (
          <div
            key={index}
            className="flex flex-1 rounded-lg  h-1"
            style={{
              backgroundColor: currentIndex === index ? "white" : "#787878",
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default React.memo(TextSlider);
