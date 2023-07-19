import React from "react";

import { useNavigate } from "react-router-dom";
import StepContainer from "../components/StepContainer";
import Step1 from "../components/Step1";
import Step2 from "../components/Step2";
import Step3 from "../components/Step3";
import SideSectionSlide from "../components/SideSectionSlide";
import Step4 from "../components/Step4";
import { useDispatch, useSelector } from "react-redux";
import axios from "../api/axios";
import { onBoarding } from "../redux/slices/auth/authActions";

function OnBoarding() {
  const [data, setData] = React.useState({});
  const { loading, userInfo, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const stepsData = [
    {
      heading: "Tell us about you.",
      description: "Whitch title most closely matches your day-to-day role?",
      formId: "step1",
    },
    {
      heading: "Tell us about your skills.",
      description:
        "From the options below, which one best describes your skill?",
      formId: "step2",
    },
    {
      heading: "Tell us about you.",
      description:
        "Please help us by entering the data below correctly to make it easier for us to know who you are.",
      formId: "step3",
    },
    {
      heading: "Tell us about you.",
      description:
        "Please help us by entering the data below correctly to make it easier for us to know who you are.",
      formId: "step4",
    },
  ];

  const handleStep1 = (userType) => {
    setData({ ...data, role: userType });
  };
  const handleStep2 = (tags) => {
    if (data.role === "Buyer") {
      setData({ ...data, interests: tags });
    } else if (data.role === "Freelancer") {
      setData({ ...data, skills: tags });
    }
  };
  const handleStep3 = async (info) => {
    try {
      if (info?.avatar) {
        const formData = new FormData();
        formData.append("files", info.avatar);
        const res = await axios.post("/upload/uploadFile", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        if (res) {
          info.avatar = res.data[0].filename;
        } else {
          info.avatar = null;
        }
      }
      setData({ ...data, ...info });
    } catch (err) {
      console.log(err);
    }
  };
  const handleStep4 = async (info) => {
    if (info?.background) {
      const formData = new FormData();
      formData.append("files", info.background);
      const res = await axios.post("/upload/uploadFile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (res) {
        info.background = res.data[0].filename;
      } else {
        info.background = null;
      }
    }
    setData({ ...data, ...info });
    dispatch(onBoarding({ ...data, ...info })).then((res) => {
      if (onBoarding.fulfilled.match(res)) {
        if (res.payload.role === "Buyer") {
          navigate("/Freelancers");
        } else if (res.payload.role === "Freelancer") {
          navigate("/Jobs");
        }
      }
    });
  };

  return (
    <div className="flex-1 flex flex-col-reverse md:flex-row overflow-y-auto">
      <section className="flex flex-col flex-1 justify-center space-y-7 px-5 py-3 md:px-12 xl:px-32 max-w-full md:max-w-[40%] xl:max-w-[40%] min-w-full md:min-w-[40%] xl:min-w-[40%] mt-5 md:mt-0">
        <StepContainer textData={stepsData}>
          <Step1 handleSubmit={handleStep1} />
          <Step2 handleSubmit={handleStep2} />
          <Step3 handleSubmit={handleStep3} />
          <Step4 loading={loading} handleSubmit={handleStep4} />
        </StepContainer>
      </section>
      <SideSectionSlide />
    </div>
  );
}

export default OnBoarding;
