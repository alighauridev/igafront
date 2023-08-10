import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Link } from "react-router-dom";
import axios from "../../api/axios";
import ServiceCard from "../../components/Services/ServiceCard";

function Tab1() {
  const [data, setData] = useState([]);
  async function fetchServices() {
    try {
      console.log("BEFORE RESPONSE ON SERVICES PAGE:");
      const res = await axios.get("/services");
      setData(res.data.data);
      console.log("RESPONSE ON SERVICES PAGE:", res);
    } catch (e) {
      console.log("Error");
    }
  }

  useEffect(() => {
    fetchServices();
  }, []);
  if (data.length === 0) {
    return (
      <div>
        <h1>Loading services...</h1>
      </div>
    );
  }
  return (
    <div>
      {data.map((service, i) => {
        return <ServiceCard key={i} data={service} />;
      })}
    </div>
  );
}

function Tab2() {
  return <div>Tab2</div>;
}

function Tab3() {
  return <div>Tab3</div>;
}

function Services() {
  const [selectedTab, setSelectedtab] = useState(1); //1,2,3,4,5
  return (
    <section className="flex-1 flex flex-col overflow-y-auto overflow-x-hidden bg-tertiary">
      <Header />
      <div className="flex-1 flex flex-col p-5 md:p-16 space-y-5">
        <div className="flex justify-between">
          <h1 className="text-4xl font-semibold mb-6">Services Details</h1>
          <Link
            to="/add-service"
            className="px-8 py-2 flex items-center justify-center text-lg font-bold rounded-md bg-blue-600 text-white"
          >
            Add New
          </Link>
        </div>
        <div className="grid grid-cols-3 w-[80%] mx-auto">
          <div
            onClick={() => setSelectedtab(1)}
            className={`${
              selectedTab == 1 ? "border-b-2 border-blue-600" : ""
            } text-center py-4 font-semibold text-lg cursor-pointer hover:border-b-2 hover:border-blue-200 hover:text-gray-600 mx-2`}
          >
            Active Services
          </div>
          <div
            onClick={() => setSelectedtab(2)}
            className={`${
              selectedTab == 2 ? "border-b-2 border-blue-600" : ""
            } text-center py-4 font-semibold text-lg cursor-pointer hover:border-b-2 hover:border-blue-200 hover:text-gray-600 mx-2`}
          >
            Paused Services
          </div>
          <div
            onClick={() => setSelectedtab(3)}
            className={`${
              selectedTab == 3 ? "border-b-2 border-blue-600" : ""
            } text-center py-4 font-semibold text-lg cursor-pointer hover:border-b-2 hover:border-blue-200 hover:text-gray-600 mx-2`}
          >
            Pending Admin Approval
          </div>
        </div>
        <div>
          {selectedTab === 1 && <Tab1 />}
          {selectedTab === 2 && <Tab2 />}
          {selectedTab === 3 && <Tab3 />}
        </div>
      </div>
      <Footer />
    </section>
  );
}

export default Services;
