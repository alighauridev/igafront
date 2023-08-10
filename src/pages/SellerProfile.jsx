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
import axios from "../api/axios";

function SellerProfile() {
  const { id } = useParams();
  const [personalInfo, setPersonalInfo] = useState(null);
  const [services, setServices] = useState([]);
  const { loading, freelancers, error } = useSelector(
    (state) => state.freelancers
  );
  async function fetchServices() {
    const res = await axios.get(`/services/buyer-view/${id}`);
    if (res.data.status === "success") {
      setServices(res.data.services);
    }
  }

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFreelancerById(id)).then((res) => {
      if (getFreelancerById.fulfilled.match(res)) {
        setPersonalInfo(res.payload.data);
      }
    });
    fetchServices();
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
          <SellerInfo {...personalInfo} services={services} />
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
