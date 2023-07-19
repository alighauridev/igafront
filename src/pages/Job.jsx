import React, { useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import JobDes from "../components/JobDes";
import BuyerInfo from "../components/BuyerInfo";
import ModalWrapper from "../components/ModalWrapper";
import BidForm from "../components/BidForm";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  createDispute,
  getJobById,
  jobDelivery,
  updateJob,
} from "../redux/slices/job/jobActions";
import Loading from "../components/Loading";
import { createBid } from "../redux/slices/bid/bidActions";
import DeliverForm from "../components/DeliverForm";
import DisputeForm from "../components/DisputeForm";
import axios from "../api/axios";
import { toast } from "react-toastify";
import { createDisputeMy } from "../redux/slices/myJob/myJobActions";

function Job() {
  const { id } = useParams();
  const [data, setData] = React.useState(null);
  const [modalType, setModalType] = React.useState(null); // ['bid', 'deliver', 'dispute']
  const { loading, jobs, error } = useSelector((state) => state.jobs);
  const myJobs = useSelector((state) => state.myJobs);
  const { userInfo } = useSelector((state) => state.auth);
  const [jobLoading, setJobLoading] = React.useState(false);
  const [completeLoading, setCompleteLoading] = React.useState(false);
  const BidData = useSelector((state) => state.bid);
  const [person, setPerson] = React.useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setJobLoading(true);
    dispatch(getJobById(id)).then((res) => {
      if (getJobById.fulfilled.match(res)) {
        console.log(res.payload);
        setData(res.payload.job);
        setPerson(res.payload.buyerDetails);
      }
      setJobLoading(false);
    });
  }, []);

  const [isOpen, setIsOpen] = React.useState(false);

  // ====== MODAL MANAGEMENT ======
  const handleModalOpen = (type) => {
    setModalType(type);
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  // ========================

  // ====== FORM SUBMISSION ======
  const handleBid = (data) => {
    dispatch(
      createBid({
        jobId: id,
        ...data,
      })
    ).then((res) => {
      if (createBid.fulfilled.match(res)) {
        setIsOpen(false);
      }
    });
  };
  const handleDispute = (data) => {
    dispatch(
      userInfo?.role === "Buyer"
        ? createDispute({
            jobId: id,
            status: "disputed",
            ...data,
          })
        : createDisputeMy({
            jobId: id,
            status: "disputed",
            ...data,
          })
    ).then((res) => {
      if (res.payload) {
        if (createDispute.fulfilled.match(res)) {
          setIsOpen(false);
          setData(res.payload);
        } else if (createDisputeMy.fulfilled.match(res)) {
          setIsOpen(false);
          setData(res.payload);
        }
      }
    });
  };

  const handleDeliver = async (data) => {
    try {
      if (data.files && data.files.length !== 0) {
        let formData = new FormData();
        for (let i = 0; i < data.files.length; i++) {
          formData.append("files", data.files[i]);
        }

        const filesData = await axios.post("/upload/uploadFile", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        //getting the data from the files and setting it with data for job creation
        data.files = filesData.data.map((file) => {
          return {
            name: file.filename,
            format: file.mimetype,
            size: file.size / 1000,
          };
        });
      }
      dispatch(
        jobDelivery({
          jobId: id,
          ...data,
        })
      ).then((res) => {
        if (jobDelivery.fulfilled.match(res)) {
          setIsOpen(false);
          setData(res.payload.job);
        }
      });
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  const handleMarkComplete = () => {
    try {
      setCompleteLoading(true);
      dispatch(
        updateJob({
          jobId: id,
          status: "completed",
        })
      ).then((res) => {
        if (updateJob.fulfilled.match(res)) {
          setData(res.payload);
        }
        setCompleteLoading(false);
      });
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  const handleCancel = async () => {
    try {
      dispatch(updateJob({ jobId: id, status: "cancelled" })).then((res) => {
        if (updateJob.fulfilled.match(res)) {
          setData(res.payload);
        }
        setCompleteLoading(false);
      });
    } catch (err) {
      toast.error(err);
    }
  };

  const handleContinue = async () => {
    try {
      setCompleteLoading(true);
      dispatch(updateJob({ jobId: id, status: "inprogress" })).then((res) => {
        if (updateJob.fulfilled.match(res)) {
          setData(res.payload);
        }
        setCompleteLoading(false);
      });
    } catch (err) {
      toast.error(err);
    }
  };

  const handleSeeBids = () => {
    navigate("/Job/" + id + "/bids");
  };

  // ========================

  return (
    <div className="relative flex-1 flex flex-col overflow-y-auto overflow-x-hidden bg-tertiary">
      <ModalWrapper
        style={{ backgroundColor: "transparent" }}
        isOpen={jobLoading}
      >
        <div className="flex self-center items-center justify-center">
          <Loading type="bars" size={40} />
        </div>
      </ModalWrapper>
      <ModalWrapper isOpen={isOpen}>
        {modalType === "bid" ? (
          <BidForm
            submitLoading={BidData.loading}
            handleSubmit={handleBid}
            handleClose={handleClose}
          />
        ) : modalType === "deliver" ? (
          <DeliverForm
            submitLoading={loading}
            handleSubmit={handleDeliver}
            handleClose={handleClose}
          />
        ) : modalType === "dispute" ? (
          <DisputeForm
            submitLoading={loading || myJobs.loading}
            handleSubmit={handleDispute}
            handleClose={handleClose}
          />
        ) : null}
      </ModalWrapper>

      <Header />
      <div className="flex flex-col md:flex-row space-y-5 space-x-0 md:space-y-0 md:space-x-5 px-7 py-12">
        <div className="flex-[2]">
          <JobDes
            adminContinue={handleContinue}
            adminCancel={handleCancel}
            seeBids={handleSeeBids}
            markComplete={handleMarkComplete}
            completeLoading={completeLoading}
            onButtonClick={handleModalOpen}
            {...data}
          />
        </div>
        <div className="flex-1">
          <BuyerInfo {...person} />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Job;
