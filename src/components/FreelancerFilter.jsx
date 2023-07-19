import { BusinessCenterOutlined,PlaceOutlined, Search } from "@mui/icons-material";
import React, { useState } from "react";
import Button from "./Button";

function FreelancerFilter(props) {

  const [name, setName] = useState(null);
  const [title, setTitle] = useState(null);
  const [filtered , setFiltered] = useState(false);


  const handleFilter = () => {
    setFiltered(true);
    props.handleFilter({ name, title});
  };
  const handleRemoveFilter = () => {
    setFiltered(false);
    setName(null)
    setTitle(null)
    props.handleRemoveFilter();
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
            placeholder="Search freelancer name"
            className="text-text font-text outline-none flex-1"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="flex items-center border-r border-[#0005] p-3 space-x-2 flex-1">
          <Search className="text-secondary" />
          <input
            type="text"
            placeholder="Search title i.e Web Developer"
            className="text-text font-text outline-none flex-1"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
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

export default FreelancerFilter;
