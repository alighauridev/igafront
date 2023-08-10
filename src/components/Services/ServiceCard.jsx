import React, { useState, useEffect } from "react";
import axios from "../../api/axios";
import { Link } from "react-router-dom";
import { baseURL } from "../../api/axios";

function ServiceCard({ data }) {
  console.log(data);
  return (
    <div className="flex px-4 py-6 space-x-4 border hover:shadow-md hover:bg-gray-100 mt-2 hover:shadow-gray-400 transition duration-200 shadow-gray-400 rounded">
      <img
        className="w-[150px] h-[70px] object-cover rounded"
        src={
          data.images.length > 0
            ? `${baseURL}/upload/image/${data.images[0]}`
            : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaAYgHeiBKQZYroNhZHUmgiECvOd_h4yTxdw&usqp=CAU"
        }
      />
      <div className="flex-1">
        <p className="text-3xl font-semibold">{data.title}</p>
        <span>⭐⭐⭐⭐⭐</span>
      </div>
      <div className="flex flex-col items-end justify-between">
        <label className="relative inline-flex items-center cursor-pointer outline-none">
          <input type="checkbox" value="" className="sr-only peer" />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          <span className="ml-3 text-sm font-medium text-gray-900 ">
            Active
          </span>
        </label>

        <Link to={`/freelancer/services/${data._id}`} className="underline">
          View
        </Link>
      </div>
    </div>
  );
}

export default ServiceCard;
