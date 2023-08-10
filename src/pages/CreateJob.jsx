import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Button from "../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { getCategory } from "../redux/slices/category/categoryActions";
import { createJob } from "../redux/slices/job/jobActions";
import axios from "../api/axios";

function CreateJob() {
  const [budget, setBudget] = useState(0);
  const [days, setDays] = useState(0);
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [subCategories, setSubCategories] = useState([]);
  const categories = useSelector((state) => state.category);
  const [allJobs, setAllJobs] = useState([]);
  const { loading, jobs, error } = useSelector((state) => state.jobs);
  const dispatch = useDispatch();

  async function getAllJobs() {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    };
    const res = await axios.get(`/jobs`, config);
    const titles = res.data.data.jobs.map((job) => {
      return { title: job.title };
    });
    setAllJobs(titles);
  }

  useEffect(() => {
    getAllJobs();
    dispatch(getCategory({}));
  }, [dispatch]);

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setSubCategory("");
    setSubCategories(
      categories.category.find((category) => category.name === e.target.value)
        ?.subCategories || []
    );
  };

  const fileRef = React.useRef(null);
  const handleFileClick = () => {
    fileRef.current.click();
  };
  function alreadyExists(title) {
    const exists = allJobs.filter((name) => name === title);
    if (exists.length > 0) {
      return true;
    }
    return false;
  }
  const submitForm = async (e) => {
    e.preventDefault();
    const data = {
      title: e.target.title.value,
      description: e.target.description.value,
      requestedBudget: budget,
      requestedDays: days,
      files: e.target.files.files,
      category: e.target.category.value,
      subCategory: e.target.subCategory.value,
    };
    if (alreadyExists(data.title)) {
      return;
    }

    console.log(data);
    //checking if some files were selcted or not if yes then upload them then get the data and set it with data for job creation
    if (data.files && data.files.length > 0) {
      const formData = new FormData();
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

    data.requestedDays = parseInt(data.requestedDays);
    data.requestedBudget = parseInt(data.requestedBudget);
    data.category = category;
    data.subCategory = subCategory;
    dispatch(createJob(data)).then((res) => {
      if (createJob.fulfilled.match(res)) {
        //remove dATA FROM FORM
        e.target.title.value = "";
        e.target.description.value = "";
        //e.target.requestedBudget.value = "";
        //e.target.requestedDays.value = "";
        setBudget(0);
        setDays(0);
        e.target.category.value = "";
        e.target.subCategory.value = "";
        setCategory("");
        setSubCategory("");
        setSubCategories([]);
      }
    });
  };

  return (
    <div className="flex-1 flex flex-col overflow-y-auto overflow-x-hidden bg-tertiary">
      <Header />
      <div className="self-center flex flex-col justify-center w-full max-w-full md:w-[50%] md:max-w-[50%]  rounded-lg bg-primary  p-5 md:p-10 m-10 space-y-5">
        <p className="text-heading font-heading text-3xl md:text-5xl text-center">
          Create a Job
        </p>
        <p className="text-text font-text text-center">
          Fill in the form below to get your job posted
        </p>
        <form onSubmit={submitForm} className="flex flex-col space-y-5">
          <div className="flex flex-col">
            <label>Job Title</label>
            <input
              type="text"
              className="border border-border rounded-md p-2"
              name="title"
              required
            />
          </div>
          <div className="flex flex-col">
            <label>Job Description</label>

            <textarea
              className="border border-border rounded-md p-2 max-h-[150px] min-h-[150px]"
              name="description"
              required
            />
          </div>
          <div className="flex flex-col group">
            <label>Budget</label>
            <div className="border border-border rounded-md p-2 flex space-x-3">
              <p className="text-gray-600 font-medium">AED $</p>
              <input
                type="number"
                value={budget}
                onChange={(e) =>
                  e.target.value < 0 ? setBudget(0) : setBudget(e.target.value)
                }
                className="focus:outline-none focus:border-none flex-1"
                name="requestedBudget"
                required
              />
            </div>
          </div>
          <div className="flex flex-col">
            <label>Timeframe (in days)</label>{" "}
            <input
              type="number"
              placeholder="Days"
              value={days}
              onChange={(e) =>
                e.target.value < 0 ? setDays(0) : setDays(e.target.value)
              }
              className="border border-border rounded-md p-2"
              name="requestedDays"
              required
            />
          </div>
          <select
            className="border border-border rounded-md p-2"
            required
            value={category}
            onChange={handleCategoryChange}
            name="category"
          >
            <option value="">Select Category</option>
            {categories.category.map((category) => (
              <option key={category.name} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
          <select
            className="border border-border rounded-md p-2"
            required
            value={subCategory}
            onChange={(e) => setSubCategory(e.target.value)}
            name="subCategory"
          >
            <option value="">Select SubCategory</option>
            {subCategories.map((subCategory) => (
              <option key={subCategory} value={subCategory}>
                {subCategory}
              </option>
            ))}
          </select>
          <div
            onClick={handleFileClick}
            className="flex items-center justify-center p-2 rounded-md bg-[#3275fa57] text-secondary w-full cursor-pointer md:max-w-[30%]"
          >
            <input
              required
              name="files"
              type="file"
              multiple
              className="hidden"
              ref={fileRef}
            />
            <p className="text-center">Choose Files</p>
          </div>
          <Button loading={loading} type={"submit"} text="Create Job" />
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default CreateJob;
