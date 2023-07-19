import React, { useEffect } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import JobStatusCard from "../components/JobStatusCard";
import { useDispatch, useSelector } from "react-redux";
import { getMyJobs } from "../redux/slices/myJob/myJobActions";
import { toast } from "react-toastify";
import Button from "../components/Button";
import Loading from "../components/Loading";
import { useNavigate } from "react-router-dom";

const Jobs = () => {
  const [selected, setSelected] = React.useState("inprogress");
  const navigate = useNavigate();
  const {
    loading,
    jobs,
    hasNextPage,
    inProgressJobs,
    deliveredJobs,
    completedJobs,
    error,
  } = useSelector((state) => state.myJobs);
  const dispatch = useDispatch();

  useEffect(() => {
    if (jobs.length === 0) {
      dispatch(getMyJobs({}));
    }
  }, [dispatch]);

  const loadMore = () => {
    try {
      if (!hasNextPage) return;
      dispatch(
        getMyJobs({
          cursor: jobs[jobs.length - 1]._id,
        })
      );
    } catch (err) {
      toast.error(err);
    }
  };

  const handleJobCLick = (id) => {
    navigate(`/job/${id}`);
  };

  const [displayJobs, setDisplayJobs] = React.useState([]);

  useEffect(() => {
    let temp = jobs.filter((job) => job.status === selected);
    setDisplayJobs(temp);
  }, [jobs, selected]);

  return (
    <div className="flex-1 flex flex-col overflow-y-auto overflow-x-hidden bg-tertiary">
      <Header />
      <div className="flex-1 flex flex-col p-5 md:p-16 space-y-10">
        <div className="flex flex-row items-center space-x-7">
          <p
            onClick={() => setSelected("inprogress")}
            className="text-heading text-lg md:text-heading font-heading  cursor-pointer"
            style={{ color: selected === "inprogress" ? "#3275fa" : "#000" }}
          >
            Active Jobs
          </p>
          <p
            onClick={() => setSelected("delivered")}
            className="text-heading text-lg md:text-heading font-heading  cursor-pointer"
            style={{ color: selected === "delivered" ? "#3275fa" : "#000" }}
          >
            Submitted Jobs
          </p>
          <p
            onClick={() => setSelected("completed")}
            className="text-heading text-lg md:text-heading font-heading  cursor-pointer"
            style={{ color: selected === "completed" ? "#3275fa" : "#000" }}
          >
            Completed Jobs
          </p>
        </div>
        <div className="flex flex-col flex-1 space-y-6">
          <p className="font-heading text-heading text-lg md:text-heading">
            {selected === "inprogress"
              ? `(${inProgressJobs}) Active Jobs`
              : selected === "delivered"
              ? `(${deliveredJobs}) Submitted Jobs`
              : `(${completedJobs}) Completed Jobs`}
          </p>
          <div className="flex-1 grid grid-flow-row grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {displayJobs.map((job, index) => (
              <JobStatusCard
                handleClick={handleJobCLick}
                key={index}
                {...job}
              />
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
      </div>
      <Footer />
    </div>
  );
};

export default Jobs;
