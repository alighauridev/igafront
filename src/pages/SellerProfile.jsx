import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SellerInfo from "../components/SellerInfo";
import { useDispatch, useSelector } from "react-redux";
import { getFreelancerById } from "../redux/slices/freelancer/freelancerAction";
import { useParams } from "react-router-dom";
import SellerInfoCard from "../components/SellerInfoCard";
import ModalWrapper from "../components/ModalWrapper";
import Loading from "../components/Loading";

function SellerProfile() {
  const { id } = useParams();
  const { loading, freelancers, error } = useSelector(
    (state) => state.freelancers
  );
  const dispatch = useDispatch();
  const [personalInfo, setPersonalInfo] = useState(null);

  useEffect(() => {
    dispatch(getFreelancerById(id)).then((res) => {
      if (getFreelancerById.fulfilled.match(res)) {
        setPersonalInfo(res.payload.data);
      }
    });
  }, []);


  return (
    <div className="relative flex-1 flex flex-col overflow-y-auto overflow-x-hidden bg-tertiary">
      <ModalWrapper style={{ backgroundColor: "transparent" }} isOpen={loading}>
        <div className="flex self-center items-center justify-center">
          <Loading type="bars" size={40} />
        </div>
      </ModalWrapper>
      <Header />
      <div className="flex flex-col md:flex-row space-y-5 space-x-0 md:space-y-0 md:space-x-5 px-7 py-12">
        <div className="flex-[2]">
          <SellerInfo {...personalInfo} />
        </div>
        <div className="flex-1">
          <SellerInfoCard {...personalInfo} />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default SellerProfile;
