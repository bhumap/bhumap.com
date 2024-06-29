import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

const PortalSidebar = () => {
  var pathname = usePathname();

  var sideBarLinks = [
    { label: "Home", href: "/portal" },
    { label: "My Properties", href: "/portal/my-properties" },
    { label: "My Listing", href: "/portal/my-listing" },
    { label: "Profile", href: "/portal/profile" },
    { label: "Update Password", href: "/portal/profile/update-password" },
  ];

  return (
    <div className="p-2 min-w-[200px] hidden lg:block">
      <h2 className="text-2xl p-2 font-semibold">Dashboard</h2>

      <div>
        {sideBarLinks.map((v, i) => {
          return (
            <div key={i}>
              <Link
                className={`px-2 py-1 ${
                  pathname == `${v.href}` && "bg-gray-200"
                } rounded-md block`}
                href={`${v.href}`}
              >
                {v.label}
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PortalSidebar;
