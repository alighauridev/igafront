import { BusinessCenterOutlined,PlaceOutlined, Search } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import Button from "./Button";
import { useDispatch, useSelector } from "react-redux";
import { getCategory } from "../redux/slices/category/categoryActions";

function BidsFilterBar(props) {

  const [status, setStatus] = useState(null);
  const [filtered , setFiltered] = useState(false);


  
  const handleFilter = () => {
    setFiltered(true);
    props.handleFilter({ status});
  };
  const handleRemoveFilter = () => {
    setFiltered(false);
    setStatus(null);
    props.handleRemoveFilter();
  };
  
  return (
    <div
      style={props.style}
      className="w-full flex flex-row items-center rounded-lg bg-primary shadow-sm p-4"
    >
      <div className="flex flex-1  pr-9 min-w-[80%] max-w-[80%]">
    
        <div className="flex items-center border-border p-3 space-x-2 flex-1">
          <BusinessCenterOutlined className="text-secondary" />
          <select className="text-text font-text outline-none w-[300px]"  onChange={(e) => setStatus(e.target.value)} value={status}>
            <option value="">Status</option>
            <option value="Pending" >Pending</option>
            <option value="Accepted" >Accepted</option>
            <option value="Rejected" >Rejected</option>
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

export default BidsFilterBar;
