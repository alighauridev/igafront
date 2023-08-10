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

function Tab6() {
  return <div>Tab6</div>;
}

function Tab7() {
  return <div>Tab7</div>;
}

function Earnings() {
  const [selectedTab, setSelectedtab] = useState(1);
  //   i.	Upcoming payments
  // ii.	Payments being cleared (Withheld)
  // iii.	Balance available for withdrawal
  // iv.	Total earnings
  // v.	Total withdrawals
  // vi.	Payments for active orders (Sellers may spend earned money for buying services)
  // vii.	Expenses to-date

  return (
    <section className="flex-1 flex flex-col overflow-y-auto overflow-x-hidden bg-tertiary">
      <Header />
      <div className="flex p-5 md:p-16 space-y-5">
        <div className="flex-grow-0 flex-shrink-0 border border-gray-200">
          <div
            onClick={() => setSelectedtab(1)}
            className={`${
              selectedTab == 1 ? "bg-blue-400 text-white" : ""
            }  border-b border-gray-200 px-8 py-4 font-semibold text-lg cursor-pointer   `}
          >
            Upcoming payments
          </div>
          <div
            onClick={() => setSelectedtab(2)}
            className={`${
              selectedTab == 2 ? "bg-blue-400 text-white" : ""
            }  border-b border-gray-200 px-8 py-4 font-semibold text-lg cursor-pointer   `}
          >
            Payments being cleared (Withheld)
          </div>
          <div
            onClick={() => setSelectedtab(3)}
            className={`${
              selectedTab == 3 ? "bg-blue-400 text-white" : ""
            } border-b border-gray-200 text-center py-4 font-semibold text-lg cursor-pointer   `}
          >
            Balance available for withdrawal
          </div>
          <div
            onClick={() => setSelectedtab(4)}
            className={`${
              selectedTab == 4 ? "bg-blue-400 text-white" : ""
            }  border-b border-gray-200 px-8 py-4 font-semibold text-lg cursor-pointer  `}
          >
            Total earnings
          </div>
          <div
            onClick={() => setSelectedtab(5)}
            className={`${
              selectedTab == 5 ? "bg-blue-400 text-white" : ""
            }  border-b border-gray-200 px-8 py-4 font-semibold text-lg cursor-pointer  `}
          >
            Total withdrawals
          </div>
          <div
            onClick={() => setSelectedtab(6)}
            className={`${
              selectedTab == 6 ? "bg-blue-400 text-white" : ""
            }  border-b border-gray-200 px-8 py-4 font-semibold text-lg cursor-pointer  `}
          >
            Payments for active orders
          </div>
          <div
            onClick={() => setSelectedtab(7)}
            className={`${
              selectedTab == 7 ? "bg-blue-400 text-white" : ""
            } px-8  py-4 font-semibold text-lg cursor-pointer  `}
          >
            Expenses to-date
          </div>
        </div>
        <div className="flex-1">
          {selectedTab === 1 && <Tab1 />}
          {selectedTab === 2 && <Tab2 />}
          {selectedTab === 3 && <Tab3 />}
          {selectedTab === 4 && <Tab4 />}
          {selectedTab === 5 && <Tab5 />}
          {selectedTab === 6 && <Tab6 />}
          {selectedTab === 7 && <Tab7 />}
        </div>
      </div>
      <Footer />
    </section>
  );
}

export default Earnings;
