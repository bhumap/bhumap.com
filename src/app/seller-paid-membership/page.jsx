import React from "react";
import Link from "next/link"
const Page = () => {
  const packages = [
    {
      name: "Bronze Package",
      features: [
        "List 5 properties for sell or rent on Bhumap",
        "Upload property video on property listing page",
        "Features Like, Comment and Share of your properties on the property listing page",
      ],
      image: "/images/b1.svg",
      price: "5100",
    },
    {
      name: "Silver Package",
      features: [
        "All features of Bronze Package",
        "Free placement on homepage banner section of one of your properties on Bhumap for xxx days",
        "Free placement in ‘’Featured Listings’’ section of one of your properties on Bhumap for xxx days",
      ],
      image: "/images/b1.svg",
      price: "11,000",
    },
    {
      name: "Gold Package",
      features: [
        "All features of Bronze Package",
        "Placement on homepage banner section of your multiple properties on Bhumap for xxx days",
        "Placement in ‘’Featured Listings’’ section of your multiple properties on Bhumap for xxx days",
        "Priority customer support",
        "Receive invitations to property investment events organized by Bhumap",
        "‘’Verified’’ badge - visible to buyers in search results, product pages and your profile",
      ],
      image: "/images/b2.svg",
      price: "51,000",
    },
    {
      name: "Platinum Package",
      features: [
        "All features of Bronze Package",
        "Placement on homepage banner section of your multiple properties on Bhumap for xxx days",
        "Placement in ‘’Featured Listings’’ section of your multiple properties on Bhumap for xxx days",
        "Listings will be included in SEO, Google Advertising and Social Media Advertising campaigns",
        "‘’Verified’’ badge - visible to buyers in search results, product pages and your profile",
        "Receive invitations to property investment events organized by Bhumap",
        "Priority customer support",
      ],
      image: "/images/b3.svg",
      price: "1,11,000",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 sm:py-10">
      <div className="flex mb-10 flex-col items-center justify-center">
        <h2 className="bg-gradient-to-l mb-2 text-xl font-bold sm:text-3xl text-transparent bg-clip-text inline-block from-black to-black/70">
          Seller Paid Membership
        </h2>
        <p className="max-w-2xl text-gray-500 text-center">
          Bhumap’s membership program can increase the chance of selling your
          property faster and your credibility as a real estate company/agent.
          Depending on your needs, you may select one of our below membership
          packages.
        </p>
      </div>

      <div className="gap-4 grid mb-10 lg:mb-20  md:grid-cols-2">
        {packages?.map((v, i) => {
          return (
            <div
              key={i}
              className="border-2 flex flex-col justify-between p-8 transition-all duration-500 hover:scale-[1.02] hover:border-primary border-gray-400 rounded-lg bg-white relative hover:shadow-[rgba(50,_50,_93,_0.25)_0px_50px_100px_-20px,_rgba(0,_0,_0,_0.3)_0px_30px_60px_-30px,_rgba(10,_37,_64,_0.35)_0px_-2px_6px_0px_inset]"
            >
              <div>
                <img className="mx-auto block w-20" src={v.image} alt="" />
                <h3 className="text-2xl font-semibold text-center">{v.name}</h3>

                <div className="text-sm flex flex-col gap-2 mb-4">
                  <ul className="max-w-2xl flex flex-col gap-2 text-sm text-gray-500">
                    {v.features?.map((f, index) => {
                      return (
                        <li key={index} className="flex gap-3">
                          <i className="bx bx-check text-xl text-primary"></i>
                          {f}
                        </li>
                      );
                    })}
                  </ul>
                </div>

                <h3 className="text-4xl font-semibold text-center">
                  {v.price}{" "}
                  <span className="text-black/50 text-lg font-medium">
                    ₹ per annum
                  </span>
                </h3>
              </div>

              <div className="flex justify-center mt-4">
                <Link href={"/seller-paid-membership/terms-and-conditions"} className="border bg-primary rounded-[.25rem] text-white font-medium text-xs sm:text-sm p-2 sm:px-10">
                  Pay Now
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Page;
