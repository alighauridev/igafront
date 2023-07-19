import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import FreelancerFilter from "../components/FreelancerFilter";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loading from "../components/Loading";
import Button from "../components/Button";
import BidCard from "../components/BidCard";
import { getBidsonAJob } from "../redux/slices/job/jobActions";
import { bidStatusUpdate } from "../redux/slices/bid/bidActions";

function Bids() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [bids, setBids] = useState([]);
  const { loading } = useSelector((state) => state.jobs);


  useEffect(() => {
    dispatch(getBidsonAJob({ jobId: id })).then((res) => {
      if (getBidsonAJob.fulfilled.match(res)) {
        setBids(res.payload);
      }
    });
  }, [dispatch]);


  const handleBidAccept = (id) => {
    dispatch(bidStatusUpdate({bidId: id, status: "accepted"})).then((res) => {
        if(res.payload){
          if(bidStatusUpdate.fulfilled.match(res)){
            setBids(bids.map((bid) => {
              if(bid._id === id){
                return res.payload
              }
              else{
                let temp = bid; 
                temp.status = "rejected";
                return temp
              }
            }))
          }
        }
      })
  };

  const handleBidCancel = (id) => {
    dispatch(bidStatusUpdate({ bidId: id, status: "rejected" })).then((res) => {
      if (bidStatusUpdate.fulfilled.match(res)) {
        setBids(
          bids.map((bid) => {
            if (bid._id === id) {
              return res.payload;
            } else {
              return bid;
            }
          })
        );
      }
    });
  };

  return (
    <div className="flex-1 flex flex-col overflow-y-auto overflow-x-hidden bg-tertiary">
      <Header />
      <div className="flex-1 flex flex-col p-5 md:p-16 space-y-5">
        {/* <FreelancerFilter /> */}
        <div className="grid grid-flow-row grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {bids.map((bid, index) => (
            <BidCard
              onAccept={handleBidAccept}
              onCancel={handleBidCancel}
              {...bid}
            />
          ))}
        </div>
        {loading && (
          <div className="flex justify-center items-center py-12">
            <Loading type="spin" size={40} />
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Bids;
