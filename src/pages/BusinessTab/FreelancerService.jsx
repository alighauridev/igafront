import React from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import axios from "../../api/axios";
import { baseURL } from "../../api/axios";

function DeleteModal({ props }) {
  const [isDeleted, setDeleted] = useState(-1);
  const navigate = useNavigate();
  // isDeleted ==-1 -> Not Deleted
  // isDeleted ==0  -> Deleting
  // isDeleted ==1  -> Deleted

  async function confirmDelete() {
    setDeleted(0);
    const deleted = await props.DeleteService();
    if (deleted) {
      console.log("Service deleted");
      setDeleted(1);
      //setDeleting(false);
      //do something after deletion
    } else {
      console.log("Service not deleted");
    }
  }
  if (isDeleted === 1) {
    setTimeout(() => {
      navigate("/business/services");
    }, 2000);
  }

  return (
    <div
      id="deleteModal"
      aria-hidden="true"
      className={`overflow-y-auto overflow-x-hidden absolute z-50 ${
        props.showDeleteModal ? "flex" : "hidden"
      } justify-center items-center w-full bg-white/80 md:inset-0 h-modal md:h-full`}
    >
      <div className="relative p-4 w-full max-w-md h-full md:h-auto">
        {isDeleted === 1 && (
          <div className="relative p-4 text-center bg-white rounded-lg shadow sm:p-5">
            Service Deleted.
          </div>
        )}

        {isDeleted === 0 && (
          <div className="relative p-4 text-center bg-white rounded-lg shadow sm:p-5">
            <div role="status">
              <svg
                aria-hidden="true"
                className="inline w-10 h-10 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
            <p> Deleting...</p>
          </div>
        )}

        {isDeleted === -1 && (
          <div className="relative p-4 text-center bg-white rounded-lg shadow sm:p-5">
            <button
              onClick={() => props.setShowDeleteModal(false)}
              type="button"
              className="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center "
              data-modal-toggle="deleteModal"
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
            <svg
              className="text-gray-400 w-11 h-11 mb-3.5 mx-auto"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <p className="mb-4 text-gray-500 ">
              Are you sure you want to delete this item?
            </p>
            <div className="flex justify-center items-center space-x-4">
              <button
                onClick={() => props.setShowDeleteModal(false)}
                data-modal-toggle="deleteModal"
                type="button"
                className="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 "
              >
                No, cancel
              </button>
              <button
                onClick={confirmDelete}
                type="submit"
                className="py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 "
              >
                Yes, I'm sure
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function FreelancerServicePage() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  useEffect(() => {
    (async function () {
      const res = await axios.get(`/services/${id}`);
      setData(res.data.service);
    })();
  }, []);
  if (!data) {
    return <div>Loading..</div>;
  }
  console.log(data);

  async function DeleteService() {
    const res = await axios.delete(`/services/${data._id}`);
    console.log("RESPONSE IN DELETE SERVICE FN:", res);
    if (res.data.status === "success") {
      return true;
    }
    return false;
  }

  return (
    <section className="flex-1 flex flex-col overflow-y-auto overflow-x-hidden bg-tertiary">
      <Header />
      <div className="min-h-screen relative flex flex-col space-y-6 p-12 mb-24">
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
        <div className="grid grid-cols-3 place-items-center gap-4 min-h-fit pb-12">
          {data.images.map((image, i) => {
            return (
              <img
                key={i}
                className="rounded w-full h-80 object-cover"
                src={`${baseURL}/upload/image/${image}`}
              />
            );
          })}
        </div>
        <button
          onClick={() => setShowDeleteModal(true)}
          className="px-4 py-2 bg-red-600 text-white font-medium ml-auto rounded"
        >
          Delete Service
        </button>
        <DeleteModal
          props={{ showDeleteModal, setShowDeleteModal, DeleteService }}
        />
      </div>
    </section>
  );
}

export default FreelancerServicePage;
