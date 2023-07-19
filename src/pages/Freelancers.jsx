import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import FreelancerCard from "../components/FreelancerCard";
import FreelancerFilter from "../components/FreelancerFilter";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getFreelancers } from "../redux/slices/freelancer/freelancerAction";
import { toast } from "react-toastify";
import { getFilteredFreelancers } from "../redux/slices/freelancer/freelancerSlice";
import Loading from "../components/Loading";
import Button from "../components/Button";

function Freelancers() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, freelancers, hasNextPage, error } = useSelector(
    (state) => state.freelancers
  );
  const [name, setName] = useState(null);
  const [title, setTitle] = useState(null);




  useEffect(() => {
    if (freelancers.length === 0) {
      dispatch(getFreelancers({}));
    }
  }, [dispatch]);

  //================Handle Filters Logic ==================
  const handleFilter = (data) => {
    try {
      setName(data.name);
      setTitle(data.title);
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  const handleRemoveFilter = () => {
    try {
      setName(null);
      setTitle(null);
    } catch (err) {
      toast.error(err);
    }
  };


  const displayFreelancers = getFilteredFreelancers(freelancers, {
   name,
   title
  });

  useEffect(() => {

    if(displayFreelancers.length < 10 && hasNextPage && !loading){
      dispatch(getFreelancers({cursor: freelancers[freelancers.length - 1]._id}));
    }

  }, [displayFreelancers]);


  //================= Pagination =================

  const loadMore = () => {
    try {
      if (!hasNextPage) return;
      dispatch(
        getFreelancers({
          cursor: freelancers[freelancers.length - 1]._id,
        })
      );
    } catch (err) {
      toast.error(err);
    }
  };

  //=======================================


  const handleView = (id) => {
    navigate(`/sellerprofile/${id}`);
  };

  return (
    <div className="flex-1 flex flex-col overflow-y-auto overflow-x-hidden bg-tertiary">
      <Header />
      <div className="flex-1 flex flex-col p-5 md:p-16 space-y-5">
        <FreelancerFilter handleFilter={handleFilter} handleRemoveFilter={handleRemoveFilter} />
        <div className="grid grid-flow-row grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {displayFreelancers.map((freelancer, index) => (
            <FreelancerCard onView={handleView} {...freelancer} />
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

export default Freelancers;
