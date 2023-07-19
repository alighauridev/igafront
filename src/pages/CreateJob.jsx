import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Button from "../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { getCategory } from "../redux/slices/category/categoryActions";
import { createJob } from "../redux/slices/job/jobActions";
import axios from "../api/axios";

function CreateJob() {
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [subCategories, setSubCategories] = useState([]);
  const categories = useSelector((state) => state.category);
  const { loading, jobs, error } = useSelector((state) => state.jobs);
  const dispatch = useDispatch();

  useEffect(() => {
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

  const submitForm = async (e) => {
    e.preventDefault();
    const data = {
      title: e.target.title.value,
      description: e.target.description.value,
      requestedBudget: e.target.requestedBudget.value,
      requestedDays: e.target.requestedDays.value,
      files: e.target.files.files,
      category: e.target.category.value,
      subCategory: e.target.subCategory.value,
    };
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
        e.target.requestedBudget.value = "";
        e.target.requestedDays.value = "";
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
          <input
            type="text"
            placeholder="Job Title"
            className="border border-border rounded-md p-2"
            name="title"
            required
          />
          <textarea
            placeholder="Job Description"
            className="border border-border rounded-md p-2 max-h-[150px] min-h-[150px]"
            name="description"
            required
          />
          <input
            type="number"
            placeholder="Budget"
            className="border border-border rounded-md p-2"
            name="requestedBudget"
            required
          />
          <input
            type="number"
            placeholder="Days"
            className="border border-border rounded-md p-2"
            name="requestedDays"
            required
          />
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
