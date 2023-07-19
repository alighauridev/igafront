import { BusinessCenterOutlined,PlaceOutlined, Search } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import Button from "./Button";
import { useDispatch, useSelector } from "react-redux";
import { getCategory } from "../redux/slices/category/categoryActions";

function JobFilterBar(props) {

  const [name, setName] = useState("");
  const [category, setCategory] = useState(null);
  const [subCategory, setSubCategory] = useState(null);
  const [subCategories, setSubCategories] = useState([]);
  const [filtered , setFiltered] = useState(false);
  
  const dispatch = useDispatch();

  const categories = useSelector((state) => state.category);

  
  useEffect(() => {
    dispatch(getCategory({}));
  }, [dispatch]);


  
  const handleFilter = () => {
    setFiltered(true);
    props.handleFilter({ name, category, subCategory});
  };
  const handleRemoveFilter = () => {
    setFiltered(false);
    setCategory(null);
    setSubCategory(null);
    props.handleRemoveFilter();
  };
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setSubCategory("");
    setSubCategories(
      categories.category.find((category) => category.name === e.target.value)
        ?.subCategories || []
    );
  };

  return (
    <div
      style={props.style}
      className="w-full flex flex-row items-center rounded-lg bg-primary shadow-sm p-4"
    >
      <div className="flex flex-1  pr-9 min-w-[80%] max-w-[80%]">
        <div className="flex items-center border-r border-[#0005] p-3 space-x-2 flex-1">
          <Search className="text-secondary" />
          <input
            type="text"
            placeholder="Search job name"
            className="text-text font-text outline-none flex-1"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="flex items-center border-r border-[#0005] p-3 space-x-2 flex-1">
          <PlaceOutlined className="text-secondary" />
          <select className="text-text font-text outline-none flex-1" onChange={handleCategoryChange}>
            <option value="">Category</option>
           {
              categories.category.map((category) => (
                <option value={category.name}>{category.name}</option>
              ))
           }
          </select>
        </div>
        <div className="flex items-center border-border p-3 space-x-2 flex-1">
          <BusinessCenterOutlined className="text-secondary" />
          <select className="text-text font-text outline-none flex-1"  onChange={(e) => setSubCategory(e.target.value)} value={subCategory}>
            <option value="">SubCategory</option>
            {subCategories.map((subCategory) => (
            <option value={subCategory}>{subCategory}</option>
          ))}
          </select>
        </div>
      </div>
      <div className="pl-28 pr-3 flex justify-end  min-w-[20%] max-w-[20%]">
        {filtered ? <div className="space-x-3 flex">
          <Button onClick={handleRemoveFilter} style={{borderRadius:30,paddingLeft:30, paddingRight:30}} text="Remove" />
          <Button onClick={handleFilter} style={{borderRadius:30,paddingLeft:30, paddingRight:30}} text="Search" />
        </div> : <Button onClick={handleFilter} style={{borderRadius:30,paddingLeft:30, paddingRight:30}} text="Search" />}
      </div>
    </div>
  );
}

export default JobFilterBar;
