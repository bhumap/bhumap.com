"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";

function AddNewCategory() {
  var [loading, setLoading] = useState(false);
  var [showCreateModal, setShowCreateModal] = useState(false);
  var [categoryname, setCategoryName] = useState("");

  const createProduct = (e) => {
      e.preventDefault();
      axios.post("/api/categories",{
        name:categoryname,
        status:"Active"
      }).then((res)=>{
        // console.log(res?.data?.data?._id)
        //    window.location.href = `/portal/products/edit/${res?.data?.data?._id}`;
        toast.success("category added successfully!");
      }).catch((err)=>{
        toast.error(err.message);
      })
  };

  return (
    <div className="">
       {
        !showCreateModal && <button
                onClick={() => {
                  setShowCreateModal(true);
                  document.body.style.overflow = "hidden";
                }}
                className="border px-3 py-2 rounded-md bg-primary text-white shadow-md italic"
              >
                  Add New Category
              </button>
       }
      <div
        className={`fixed ${
          showCreateModal
            ? "visible opacity-100 scale-100"
            : "invisible opacity-0 scale-0"
        } transition-all duration-1000 top-0 left-0 w-screen h-screen bg-black/50 backdrop-blur-md z-20`}
      >
        <div
          onClick={() => {
            setShowCreateModal(false);
            // document.body.style.overflow = "auto";
          }}
          className="w-full h-full"
        ></div>
        <div className="absolute min-w-[300px] bg-white shadow-lg top-1/2 left-1/2 rounded-lg -translate-x-1/2 -translate-y-1/2 z-10">
          <h2 className="font-semibold text-lg border-b py-2 px-4 border-black/20">
            Add New Category
          </h2>
          <form onSubmit={createProduct} className="p-4">
            <input
              type="text"
              disabled={loading}
              onChange={(e) => setCategoryName(e.target.value)}
              className="block w-full mb-4 border rounded-md border-black/20"
              placeholder="Enter New Category Name"
            />
            <div className="flex justify-end gap-3">
              <button
                type="button"
                disabled={loading}
                onClick={() => {
                  setShowCreateModal(false);
                  document.body.style.overflow = "auto";
                }}
                className="px-3 disabled:opacity-50 disabled:cursor-not-allowed py-1 rounded-md border text-primary border-primary"
              >
                Cancel
              </button>
              <button
                disabled={loading}
                className="px-3 disabled:opacity-50 disabled:cursor-not-allowed py-1 rounded-md border text-white bg-primary"
              >
                {loading && (
                  <i className="bx mr-1 bx-loader-circle bx-spin"></i>
                )}
                {loading ? "Processing..." : "Create"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddNewCategory;
