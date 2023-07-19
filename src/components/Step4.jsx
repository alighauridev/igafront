import { TextField } from "@mui/material";
import React from "react";
import Camera from "../Svgs/Camera";
import Button from "./Button";

function Step4(props) {
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
      background: selectedFile,
      bio: e.target.bio.value,
      title: e.target.title.value,
    };
    props.handleSubmit(data);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="min-w-full flex-1 flex flex-col space-y-5"
    >
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
          <p className="font-heading text-lg">Upload Background Image.</p>
          <p className="text-text font-text">Max. Size 2 Mb</p>
        </div>
      </div>
      <div className="flex flex-col space-y-5">
        <TextField
          id="standard-basic"
          label="Bio"
          placeholder="Tell us about yourself"
          variant="standard"
          name="bio"
        />
        <TextField
          id="standard-basic"
          label="Title"
          placeholder="What best defines you i.e Web Developer"
          variant="standard"
          name="title"
        />
      </div>
      <Button
        loading={props.loading}
        type="submit"
        style={{ marginTop: 30 }}
        text="Submit"
      />
    </form>
  );
}

export default Step4;
