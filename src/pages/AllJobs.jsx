import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import JobFilterBar from "../components/JobFilterBar";
import JobCard from "../components/JobCard";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getJobs } from "../redux/slices/job/jobActions";
import { toast } from "react-toastify";
import Button from "../components/Button";
import Loading from "../components/Loading";
import { getFilteredJobs } from "../redux/slices/job/jobSlice";

function AllJobs() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, jobs, hasNextPage, error } = useSelector(
    (state) => state.jobs
  );
  const [category, setCategory] = useState(null);
  const [subCategory, setSubCategory] = useState(null);
  const [name, setName] = useState(null);

  //=========== Fetching Jobs INitially =================

  useEffect(() => {
    if (jobs.length === 0) {
      dispatch(getJobs({}));
    }
  }, [dispatch]);

  //================Handle Filters Logic ==================
  const handleFilter = (data) => {
    try {
      setCategory(data.category);
      setSubCategory(data.subCategory);
      setName(data.name);
    } catch (err) {
      toast.error(err);
    }
  };

  const handleRemoveFilter = () => {
    try {
      setCategory(null);
      setSubCategory(null);
      setName(null);
    } catch (err) {
      toast.error(err);
    }
  };

  const displayJobs = getFilteredJobs(jobs, {
    category,
    subCategory,
    name,
  });

  useEffect(() => {
    if (displayJobs.length < 10 && hasNextPage && !loading) {
      dispatch(getJobs({ cursor: jobs[jobs.length - 1]._id }));
    }
  }, [displayJobs]);

  // =========== handles Paginatio n=================
  const loadMore = () => {
    try {
      if (!hasNextPage) return;
      dispatch(
        getJobs({
          cursor: jobs[jobs.length - 1]._id,
        })
      );
    } catch (err) {
      toast.error(err);
    }
  };

  // =========== handles View Job ==================
  const handleView = (id) => {
    navigate(`/job/${id}`);
  };

  //=======================================

  return (
    <div className="flex-1 flex flex-col overflow-y-auto overflow-x-hidden bg-tertiary">
      <Header />
      {/* <div className="w-full min-h-screen max-h-screen">
        <HeroSection />
      </div> */}
      <div className="py-7 px-5">
        <JobFilterBar
          handleFilter={handleFilter}
          handleRemoveFilter={handleRemoveFilter}
        />
      </div>
      <div>Hello world</div>
      <div className="grid grid-flow-row grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 p-5 pb-16">
        {displayJobs.map((job) => (
          <JobCard onView={handleView} {...job} />
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
      <Footer />
    </div>
  );
}

export default AllJobs;
