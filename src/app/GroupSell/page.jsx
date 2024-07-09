"use client";

import Card from "@/src/components/Card";
import React, { useState } from "react";

const page = () => {
  return (
    <div className=" overflow-hidden h-auto card-mm ">
      <div className="h-auto m-auto w-11/12 mx-auto my-8 overflow-hidden grid sm:grid-cols-1 pb-8 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3 gap-6">
        <>
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </>
      </div>
    </div>
  );
};

export default page;
