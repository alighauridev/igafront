import React, { useState } from "react";

export default function ImagesUploaded({ files }) {
  return (
    <div className="bg-white rounded-lg flex flex-col space-y-3 pt-4">
      <div className="grid grid-cols-6 items-center">
        <h1 className="text-xl font-semibold my-2 col-span-3">
          Images Uploaded
        </h1>
      </div>
      <div className="text-gray-400 text-sm w-full grid grid-cols-6">
        <p className="col-span-3">File name</p>
        <p className="text-center">Date</p>
        <p className="text-center">Size</p>
        <p className="text-center">Media Type</p>
      </div>
      <hr />
      {files.length > 0 && (
        <div>
          {files.map((file, index) => {
            return <FileItem key={index} file={file} />;
          })}
        </div>
      )}
    </div>
  );
}
function FileItem({ file }) {
  let thumbnail = null;
  if (file.type.includes("image/")) {
    thumbnail = (
      <img
        src={URL.createObjectURL(file)}
        alt={file.name}
        className="w-[80px] h-[50px] object-cover rounded"
      />
    );
  } else if (file.type.includes("video/")) {
    thumbnail = (
      <video
        src={URL.createObjectURL(file)}
        className="w-[80px] h-[50px] object-fit rounded"
      />
    );
  } else {
    thumbnail = (
      <img
        src="/assets/file.jpg"
        alt=""
        className="w-[80px] h-[50px] object-fit rounded"
      />
    );
  }
  const fileSize = file.size;
  const fileSizeKB = (fileSize / 1024).toFixed(2);
  const fileSizeMB = (fileSizeKB / 1024).toFixed(2);

  return (
    <div className="mb-4 grid grid-cols-6 items-center">
      <div className="col-span-3 flex space-x-3">
        {/* {file.type.includes("image/") ? (
            <img
              src={URL.createObjectURL(file)}
              alt={file.name}
              className="w-[80px] h-[50px] object-fit rounded"
            />
          ) : (
            <Image
              src="/assets/file.jpg"
              alt=""
              width={200}
              height={200}
              className="w-[80px] h-[50px] object-fit rounded"
            />
          )}
  
          {file.type.includes("video/") ? (
            <video
              src={URL.createObjectURL(file)}
              className="w-[80px] h-[50px] object-fit rounded"
            />
          ) : (
            <Image
              src="/assets/file.jpg"
              alt=""
              width={200}
              height={200}
              className="w-[80px] h-[50px] object-fit rounded"
            />
          )} */}
        {thumbnail !== null && thumbnail}
        <div>
          <p className="text-lg font-medium">{file.name}</p>
          <p className="text-xs font-medium text-gray-400">
            1280 x 720p @ 30fps
          </p>
        </div>
      </div>
      <p className="text-center text-sm ">Yesterday</p>
      <p className="text-center text-sm font-semibold">{fileSizeMB}MB</p>
      <p className="text-center text-sm w-[100px] mx-auto overflow-hidden">
        {file.type}
      </p>
    </div>
  );
}
