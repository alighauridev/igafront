import React, { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ImagesListContainer from "../../components/AddNewService/ImagesListContainer";
import axios from "../../api/axios";
import SuccessImage from "../../images/success.jpg";
import { Link } from "react-router-dom";

function ServiceSuccess() {
  return (
    <section className="flex-1 flex flex-col overflow-y-auto overflow-x-hidden bg-tertiary">
      <Header />
      <div className="bg-white p-12 mx-auto space-y-4 flex flex-col items-center my-16 rounded-lg shadow shadow-gray-400">
        <img src={SuccessImage} className="w-[300px]" />
        <h1 className="text-3xl font-semibold text-gray-500">
          You successfully created your service.
        </h1>
        <p className="text-xl text-gray-600">
          <Link to="/business/services" className="underline">
            Click here
          </Link>{" "}
          to visit dashboard
        </p>
      </div>
      <Footer />
    </section>
  );
}

function AddNewService() {
  const [creating, setCreating] = useState(false);
  const [serviceCreated, setServiceCreated] = useState(false);
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({ title: "", description: "" });
  async function uploadFiles(allfiles) {
    let filenames = [];
    for (let file of allfiles) {
      const myForm = new FormData();
      myForm.append("files", file);
      const res = await axios.post("/upload/uploadFile", myForm, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      filenames.push(res.data[0].filename);
    }
    return filenames;
  }

  async function createNewService(e) {
    setCreating(true);
    e.preventDefault();
    const filenames = await uploadFiles(files);
    const inputData = { ...formData, images: filenames };

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    };
    const res = await axios.post(`/services`, inputData, config);
    if (res.data.status === "success") {
      setServiceCreated(true);
    }
  }
  if (serviceCreated) {
    return <ServiceSuccess />;
  }
  return (
    <section className="flex-1 flex flex-col overflow-y-auto overflow-x-hidden bg-tertiary">
      <Header />
      <div className="flex-1 flex flex-col p-5 md:p-16 space-y-5">
        <h1 className="text-4xl font-semibold mb-6">Create A New Service</h1>
        <form className="bg-white px-16 py-12 w-[80%] mx-auto flex flex-col space-y-4">
          <div>
            <p className="text-xl font-semibold my-2">Title</p>
            <input
              value={formData["title"]}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              type="text"
              placeholder="I will build your website with Nextjs..."
              className="w-full border rounded px-2 py-2 text-lg border-gray-200 outline-none focus:shadow focus:shadow-gray-300"
            />
          </div>
          <div>
            <p className="text-xl font-semibold my-2">Description</p>
            <textarea
              value={formData["description"]}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Explain service details"
              className="w-full border rounded min-h-[200px] text-lg px-2 py-2 border-gray-200 outline-none focus:shadow focus:shadow-gray-300"
            />
          </div>
          <ImagesListContainer data={{ files, setFiles }} />
          {creating ? (
            <button
              disabled
              type="button"
              className="ml-auto hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 text-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center px-8 py-2 text-lg font-bold rounded-md bg-blue-600 text-white"
            >
              <svg
                aria-hidden="true"
                role="status"
                className="inline w-4 h-4 mr-3 text-white animate-spin"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="#E5E7EB"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentColor"
                />
              </svg>
              Creating Service...
            </button>
          ) : (
            <button
              onClick={createNewService}
              className="px-8 py-2 ml-auto text-lg font-bold rounded-md bg-blue-600 text-white"
            >
              Submit
            </button>
          )}
        </form>
      </div>
      <Footer />
    </section>
  );
}

export default AddNewService;
