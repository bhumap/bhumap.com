"use client";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";


import React, { useState } from "react";
import Button from "../../ui/button";
import { X } from "lucide-react";

function ProductFeaturesModal({features}) {
    const [open, setOpen] = useState(false);

    return (
        <div>
            <Button customClass="w-full" onClick={() => setOpen(true)} title={"See this product details"} />
            {open && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="relative bg-white p-6 rounded-lg shadow-lg w-96">
                        <button 
                            onClick={() => setOpen(false)}
                            className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
                        >
                            <X size={24} />
                        </button>
                        <h2 className="text-xl font-semibold mb-4">Product Features</h2>
                        {
                            features && features.length > 0 ? features?.map((item,id) =>(
                                <div key={id} className="flex gap-2 items-center">
                                    <IoMdCheckmarkCircleOutline className="text-primary"/>
                                    <span className="italic text-sm">
                                        {item}   
                                    </span>
                                </div>
                            )) :
                             <p className="text-sm text-gray-500 text-center">No Features available</p>
                        }
                    </div>
                </div>
            )}
        </div>
    );
}

export default ProductFeaturesModal;