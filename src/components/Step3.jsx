import { TextField } from "@mui/material";
import React from "react";
import Camera from "../Svgs/Camera";
import Button from "./Button";

function Step3(props) {
  const hiddenFileInputRef = React.useRef(null);
  const [selectedFile, setSelectedFile] = React.useState(null);

  const handleFileButton = () => {
    hiddenFileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    if (e.target.files.length === 0) {
      setSelectedFile(null);
      return;
    }
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let data = {
      avatar: selectedFile,
      designation: e.target.designation.value,
      companyName: e.target.company.value,
      location: e.target.location.value,

    }
    props.handleSubmit(data);
    props.handleClick();
  }

  return (
    <form onSubmit={handleSubmit} className="min-w-full flex-1 flex flex-col space-y-5">
      <div className="flex items-center space-x-5">
        <input
          type="file"
          hidden
          ref={hiddenFileInputRef}
          onChange={handleFileChange}
          className="none"
        />
        <div
          onClick={handleFileButton}
          className="rounded-full w-16 h-16 flex justify-center items-center bg-border "
        >
          {selectedFile !== null ? (
            <img
              src={URL.createObjectURL(selectedFile)}
              className="flex w-16 h-16 max-w-16 max-h-16 rounded-full"
              alt="selected"
            />
          ) : (
            <Camera />
          )}
        </div>
        <div className="flex flex-col">
          <p className="font-heading text-lg">Upload Image.</p>
          <p className="text-text font-text">Max. Size 2 Mb</p>
        </div>
      </div>
      <div className="flex flex-col space-y-5">
        <TextField
          id="standard-basic"
          label="Enter your designation"
          variant="standard"
          name="designation"
        />
        <TextField id="standard-basic" label="Company" variant="standard" name="company"/>
        <TextField id="standard-basic" label="Location" variant="standard" name="location" />
      </div>
      <Button type="submit" style={{ marginTop: 30 }} text="Next" />
    </form>
  );
}

export default Step3;
