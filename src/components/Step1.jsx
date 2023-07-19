import React from "react";
import Button from "./Button";

function Step1(props) {
  const [userType, setUserType] = React.useState("Freelancer");
  const availableTypes = ["Freelancer", "Buyer"];
  const myRef = React.useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    props.handleSubmit(userType);
    props.handleClick();
  };

  return (
    <div className="flex w-full min-w-full box-border">
      <form
        ref={myRef}
        id="step1"
        onSubmit={handleSubmit}
        className="flex-1 flex flex-col space-y-5 "
      >
        {availableTypes.map((item, index) => (
          <div
            onClick={() => setUserType(item)}
            className={`flex justify-between p-3 rounded-md border ${
              item === userType ? "border-secondary" : "border-border"
            }`}
          >
            <p className="font-heading text-base">{item}</p>
            <div
              className={`flex justify-center items-center rounded-full w-6 h-6 ${
                userType === item && "bg-secondary"
              }`}
            >
              <div
                className={`rounded-full w-3 h-3 ${
                  userType === item && "bg-primary"
                }`}
              ></div>
            </div>
          </div>
        ))}
        <Button type="submit" style={{ marginTop: 30 }} text="Next" />
      </form>
    </div>
  );
}

export default Step1;
