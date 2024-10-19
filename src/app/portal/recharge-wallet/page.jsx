"use client";
import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "@/src/context/AuthContext";
import axios from "axios";
import { format } from 'date-fns';
import { isDev } from "@/src/backend/helpers/util";
import Transaction from "@/src/components/Transaction";

const Page = () => {

  return (
    <section className="flex flex-col items-center justify-center mt-5 mx-auto">
     <h3 className="text-xl">Manage Recharge</h3>   
     <Transaction />
    </section>
  );
};

export default Page;
