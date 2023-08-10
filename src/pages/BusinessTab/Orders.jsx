import React, { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

function Tab1() {
  return <div>Tab1</div>;
}

function Tab2() {
  return <div>Tab2</div>;
}

function Tab3() {
  return <div>Tab3</div>;
}

function Tab4() {
  return <div>Tab4</div>;
}

function Tab5() {
  return <div>Tab5</div>;
}

function Orders() {
  // Active, Late, Delivered, Completed, Cancelled
  const [selectedTab, setSelectedtab] = useState(1);
  return (
    <section className="flex-1 flex flex-col overflow-y-auto overflow-x-hidden bg-tertiary">
      <Header />
      <div className="flex-1 flex flex-col p-5 md:p-16 space-y-5">
        <h1 className="text-4xl font-semibold mb-6">Order Details</h1>
        <div className="grid grid-cols-5 w-[80%] mx-auto">
          <div
            onClick={() => setSelectedtab(1)}
            className={`${
              selectedTab == 1 ? "border-b-2 border-blue-600" : ""
            } text-center py-4 font-semibold text-lg cursor-pointer hover:border-b-2 hover:border-blue-200 hover:text-gray-600 mx-2`}
          >
            Active
          </div>
          <div
            onClick={() => setSelectedtab(2)}
            className={`${
              selectedTab == 2 ? "border-b-2 border-blue-600" : ""
            } text-center py-4 font-semibold text-lg cursor-pointer hover:border-b-2 hover:border-blue-200 hover:text-gray-600 mx-2`}
          >
            Late
          </div>
          <div
            onClick={() => setSelectedtab(3)}
            className={`${
              selectedTab == 3 ? "border-b-2 border-blue-600" : ""
            } text-center py-4 font-semibold text-lg cursor-pointer hover:border-b-2 hover:border-blue-200 hover:text-gray-600 mx-2`}
          >
            Delivered
          </div>
          <div
            onClick={() => setSelectedtab(4)}
            className={`${
              selectedTab == 4 ? "border-b-2 border-blue-600" : ""
            } text-center py-4 font-semibold text-lg cursor-pointer hover:border-b-2 hover:border-blue-200 hover:text-gray-600 mx-2`}
          >
            Completed
          </div>
          <div
            onClick={() => setSelectedtab(5)}
            className={`${
              selectedTab == 5 ? "border-b-2 border-blue-600" : ""
            } text-center py-4 font-semibold text-lg cursor-pointer hover:border-b-2 hover:border-blue-200 hover:text-gray-600 mx-2`}
          >
            Cancelled
          </div>
        </div>
        <div>
          {selectedTab === 1 && <Tab1 />}
          {selectedTab === 2 && <Tab2 />}
          {selectedTab === 3 && <Tab3 />}
          {selectedTab === 4 && <Tab4 />}
          {selectedTab === 5 && <Tab5 />}
        </div>
      </div>
      <Footer />
    </section>
  );
}

export default Orders;
