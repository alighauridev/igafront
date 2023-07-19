import React from "react";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  TextField,
} from "@mui/material";
import { Cancel } from "@mui/icons-material";
import Button from "./Button";

function Step2(props) {
  const [tags, setTags] = React.useState([]);

  const handleAdd = (e) => {
    if (e.key === "Enter") {
      if (!tags.includes(e.target.value)) {
        setTags([...tags, e.target.value]);
      }
      e.target.value = "";
    }
  };

  const handleRemove = (tag) => {
    setTags(tags.filter((item) => item !== tag));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.handleSubmit(tags);
    props.handleClick();
  }


  return (
    <form onKeyDown={(e)=>{
      if(e.key === "Enter"){
        e.preventDefault()
      }
    }} onSubmit={handleSubmit} className="flex flex-col flex-1 min-w-full">
      <div className="flex-1 max-w-full max-h-full flex items-center flex-wrap border border-secondary rounded-md p-3 ">
        {tags.map((item, index) => (
          <div
            key={index.toString()}
            className="flex justify-center items-center rounded-md bg-secondary text-white p-2 m-1"
          >
            {item}
            <Cancel
              className="ml-2 cursor-pointer"
              onClick={() => handleRemove(item)}
            />
          </div>
        ))}
        {tags.length !== 5 && (
          <input
            type="text"
            placeholder="Add"
            className="outline-none border-none bg-transparent flex-1 text-secondary font-text"
            onKeyDown={handleAdd}
          />
        )}
      </div>
      <Button onKeyDown={null} type="submit" style={{ marginTop: 30 }} text="Next" />
    </form>
  );
}

export default Step2;
