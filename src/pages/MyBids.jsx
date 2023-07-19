import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loading from "../components/Loading";
import Button from "../components/Button";
import BidCard from "../components/BidCard";
import BidsFilterBar from "../components/BidsFilterBar";
import { getMyBids } from "../redux/slices/bid/bidActions";
import { getFilteredBids } from "../redux/slices/bid/bidSlice";

function MyBids() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, bids, hasNextPage, error } = useSelector(
    (state) => state.bid
  );
  const [status, setStatus] = useState(null);

  //=========== Fetching Bids INitially =================

  useEffect(() => {
    if (bids.length === 0) {
      dispatch(getMyBids({}));
    }
  }, [dispatch]);

  //================ Handle Filters Logic ==================
  const handleFilter = (data) => {
    try {
      setStatus(data.status);
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  const handleRemoveFilter = () => {
    try {
      setStatus(null);
    } catch (err) {
      toast.error(err);
    }
  };

  const displayBids = getFilteredBids(bids, {
    status,
  });

  useEffect(() => {
    if (displayBids.length < 10 && hasNextPage && !loading) {
      dispatch(getMyBids({ cursor: bids[bids.length - 1]._id }));
    }
  }, [displayBids]);

  // ================== Pagination ====================

  const loadMore = () => {
    try {
      if (!hasNextPage) return;
      dispatch(
        getMyBids({
          cursor: bids[bids.length - 1]._id,
        })
      );
    } catch (err) {
      toast.error(err);
    }
  };

  // ======================================

  return (
    <div className="flex-1 flex flex-col overflow-y-auto overflow-x-hidden bg-tertiary">
      <Header />
      <div className="flex-1 flex flex-col p-5 md:p-16 space-y-5">
        <BidsFilterBar
          handleFilter={handleFilter}
          handleRemoveFilter={handleRemoveFilter}
        />
        <div className="grid grid-flow-row grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {displayBids.map((bid, index) => (
            <BidCard {...bid} />
          ))}
        </div>
        {loading && !hasNextPage && (
          <div className="flex justify-center items-center py-12">
            <Loading type="spin" size={40} />
          </div>
        )}
        {hasNextPage && (
          <div className="flex justify-center items-center py-12">
            <Button
              loading={loading}
              onClick={loadMore}
              style={{ paddingLeft: 25, paddingRight: 25, borderRadius: 5 }}
              text="Load More"
            />
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default MyBids;
