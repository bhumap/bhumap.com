"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
const Page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const package_id = searchParams.get("id");
  const [isChecked, setIsChecked] = useState(false);

  const handleChange = (event) => {
    setIsChecked(event.target.checked);
  };

  return (
    <>
      <div className="max-w-6xl mx-auto px-4 py-6 sm:py-10">
        <div>
          <h1 className="text-3xl font-bold mb-3">Terms And Conditions</h1>
          <p className="mb-3" >
            After thorough consideration and careful deliberation, I have made the
            decision to subscribe to the services offered by BHUMAP. Having been
            familiar with BHUMAP for many years, I have observed its consistent
            dedication and commitment to serving its members. The longevity of its
            operations speaks volumes about its reliability and credibility.{" "}
          </p>

          <p className="mb-3">

            One of the factors that influenced my decision is BHUMAP&apos;s alignment
            with the guidelines set forth by the Government of India. By adhering
            to these regulations, BHUMAP not only ensures compliance but also
            demonstrates its commitment to ethical practices and legal integrity.
            This gives me confidence in the legitimacy of the company&apos;s operations
            and its dedication to operating within the boundaries of the law.{" "}
          </p>

          <p className="mb-3">

            Moreover, the widespread impact of BHUMAP is evident from the
            thousands of individuals who are associated with the company and have
            reaped the benefits of its services. Knowing that there is a large
            community of members who have found value in BHUMAP&apos;s offerings
            reassures me of its efficacy and potential to meet my own needs and
            objectives.
          </p>

          <p className="mb-3">

            In committing to take up the membership subscription of BHUMAP, I do
            so with a firm resolve to abide by the rules and regulations set forth
            by the company. This entails not only understanding the terms of
            membership but also actively engaging with them in my investment
            decisions. By following the guidelines laid out by BHUMAP, I aim to
            make informed and prudent investment choices that align with both my
            financial goals and the principles upheld by the company.
          </p>
          <p className="mb-3">
            Overall, my decision to subscribe to BHUMAP&apos;s services is rooted in a
            thorough evaluation of its track record, its adherence to government
            regulations, and its proven benefits to its members. I am confident
            that by becoming a member of BHUMAP, I am positioning myself to access
            valuable resources and guidance that will support me in my financial
            endeavors.
          </p>

        </div>
        <div className=" mt-3">
          <div>
            <label>
              <input
                type="checkbox"
                onChange={handleChange}
                checked={isChecked}
                className="mr-3"
              />
              I Agree the Terms And Conditions
            </label>
          </div>
          <button
            disabled={!isChecked}
            onClick={() => router.push(`/buyer-paid-membership/scan-code?id=${package_id}`)}
            className={`${isChecked ? "bg-primary cursor-pointer" : "bg-primary/30 cursor-not-allowed"
              } border cursor-pointer  rounded-[.25rem] text-white font-medium text-xs sm:text-sm p-2 sm:px-6 mt-3`}
          >
           Continue to Pay
          </button>
        </div>
      </div>
    </>
  );
};

export default Page;
