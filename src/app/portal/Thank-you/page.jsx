"use client";

import React from "react";
import { FaRegSmile } from "react-icons/fa";
import { motion } from "framer-motion";

const ThankYouPage = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <motion.div
        className="text-center max-w-md w-full p-6"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >

        <div className="flex flex-col items-center mb-6">
          <FaRegSmile className="text-6xl mb-4 text-green-600 animate-bounce" />
          <h1 className="text-2xl font-bold mb-2 text-gray-800">Thank You for Your Order! 🎉</h1>
          <p className="text-lg text-gray-700">Your order has been placed successfully.</p>
        </div>
        <a
          href="/portal/orders"
          className="bg-green-500 text-white font-semibold py-2 px-6 rounded-lg hover:bg-green-600 transition duration-300"
        >
          View Order History
        </a>
      </motion.div>
    </div>
  );
};

export default ThankYouPage;
