import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import { baseURL } from "../api/axios";
import axios from "../api/axios";
import SellerInfoCard from "../components/SellerInfoCard";
import { getFreelancerById } from "../redux/slices/freelancer/freelancerAction";
import FsLightbox from "fslightbox-react";

function BuyerServiceViewPage() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [personalInfo, setPersonalInfo] = useState(null);
  const [toggler, setToggler] = useState(false);
  const [selectedImage, setSelectedImage] = useState([]);

  const dispatch = useDispatch();

  async function fetchData() {
    const res = await axios.get(`/services/${id}`);
    setData(res.data.service);

    dispatch(getFreelancerById(res.data.service.freelancer)).then((res) => {
      if (getFreelancerById.fulfilled.match(res)) {
        setPersonalInfo(res.payload.data);
      }
    });
  }
  useEffect(() => {
    fetchData();
  }, []);

  if (!data && !personalInfo) {
    return <div>Loading..</div>;
  }

  return (
    <>
      <section className="flex-1 flex flex-col overflow-y-auto overflow-x-hidden bg-tertiary">
        <Header />
        <div className="flex">
          <div className="min-h-screen relative flex flex-col space-y-6 p-12 mb-24 flex-[2]">
            <div className="flex flex-col">
              <label className="text-2xl font-semibold">Title:</label>
              <h2 className="text-xl">{data.title}</h2>
            </div>
            <div className="flex flex-col">
              <label className="text-2xl font-semibold">Description:</label>
              <textarea
                className="text-xl bg-transparent h-fit"
                value={data.description}
                disabled
              ></textarea>
            </div>
            <div className="grid grid-cols-2 place-items-center gap-4 min-h-fit pb-12">
              {data.images.map((image, i) => {
                return (
                  <img
                    key={i}
                    className="rounded w-full h-80 object-cover hover:ring-2 hover:ring-offset-2 cursor-pointer ring-blue-400"
                    src={`${baseURL}/upload/image/${image}`}
                    onClick={() => {
                      setToggler(!toggler);
                      setSelectedImage([`${baseURL}/upload/image/${image}`]);
                    }}
                  />
                );
              })}
              <FsLightbox toggler={toggler} sources={selectedImage} />
            </div>
          </div>
          <div className="flex-1">
            <SellerInfoCard {...personalInfo} />
          </div>
        </div>
      </section>
    </>
  );
}

export default BuyerServiceViewPage;
