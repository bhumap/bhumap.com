"use client";

import { useEffect, useState, useContext } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AuthContext } from "@/src/context/AuthContext";
import { CartContext } from "@/src/context/CartContext";
import axios from "axios";

const Navbar = () => {
  var pathname = usePathname();
  var [open, setOpen] = useState(false);
  var [layer, setLayer] = useState(false);
  var [showProfile, setShowProfile] = useState(false);
  const {cartItems,setShowSideCart} = useContext(CartContext);
  const { user } = useContext(AuthContext);

  console.log(user?.userType);

  useEffect(() => {
    if (open) {
      setOpen(false);
    }
    setShowProfile(false);
  }, [pathname]);

  useEffect(() => {
    if (layer) {
      const timeoutId = setTimeout(() => {
        setOpen(true);
      }, 500);

      // Cleanup the timeout to avoid memory leaks
      return () => clearTimeout(timeoutId);
    }
  }, [layer]);

  useEffect(() => {
    if (!open) {
      const timeoutId2 = setTimeout(() => {
        setLayer(false);
      }, 500);

      return () => clearTimeout(timeoutId2);
    }
  }, [open]);

  useEffect(() => {
    if (
      user &&
      user.userType !== "Admin" &&
      pathname.startsWith("/portal/admin")
    ) {
      window.location.replace("/");
    }
  }, [user, pathname]);

  const handleLogout = async () => {
    try {
      const confirmLogout = window.confirm("Are you sure you want to logout?");
      if (!confirmLogout) return;
      const res = await axios.post("/api/auth/logout");
      if (res.data.success) {
        window.location.replace("/");
      }
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <header className="px-4 bg-white shadow-md sticky top-0 z-[999]">
      <nav className="flex items-center justify-between py-2 mx-auto">
        <div className="flex items-center">
          <div className="text-3xl flex mr-2 border rounded-md text-gray-500 justify-center items-center md:hidden">
            <i
              onClick={() => {
                setLayer(true);
              }}
              className={`bx bx-menu`}
            ></i>
          </div>
          <Link href="/" className="inline-block text-2xl font-bold">
            <img
              className="w-32 h-auto mb-2 hidden sm:block"
              src="/fullLogo.svg"
              alt=""
            />
            <img className="w-7 h-auto mb-2 sm:hidden" src="/logo.svg" alt="" />
          </Link>
        </div>

        <div
          onClick={() => setOpen(false)}
          className={`${
            layer ? "translate-x-0" : "translate-x-[-100%]"
          } duration-500 transition-all absolute top-0 left-0 w-[100%] z-10 bg-black/50 backdrop-blur-sm h-[100vh] md:hidden`}
        ></div>

        <div className="flex gap-7 items-center">
          <div
            className={`${
              open ? "translate-x-0" : "translate-x-[-100%]"
            } md:p-0 p-4 duration-500 transition-all absolute text-gray-600 top-0 whitespace-nowrap left-0 z-10 md:translate-x-0 bg-gray-100 md:bg-white shadow-md h-screen min-w-[50%] md:h-auto md:min-w-[auto] md:shadow-none  md:relative`}
          >
            <Link
              href="/"
              className="inline-block text-2xl font-bold md:hidden"
            >
              <img className="w-32 h-auto" src="/fullLogo.svg" alt="" />
            </Link>

            <label className="relative block p-2 group md:inline-block">
              <Link href="/">
                <div className="flex items-center justify-between cursor-pointer">
                  Bhumap<i className="text-xl bx bx-chevron-down"></i>
                </div>
              </Link>
              <div className="max-h-0 overflow-hidden py-0 group-hover:py-1 group-hover:max-h-80 md:absolute md:block left-2 md:py-1 shadow-md bg-white border rounded-md opacity-0 pointer-events-none group-hover:pointer-events-auto group-hover:opacity-100 min-w-32 md:group-hover:top-full transition-all duration-500 top-[110%]">
                <Link className="block p-1 px-3" href="/">
                  About Company
                </Link>
                <Link className="block p-1 px-3" href="/">
                  Investor Relation
                </Link>
                <Link className="block p-1 px-3" href="/">
                  Contact Us
                </Link>
              </div>
            </label>

            <label className="relative block p-2 group md:inline-block">
              <div className="flex items-center justify-between cursor-pointer">
                Buy<i className="text-xl bx bx-chevron-down"></i>
              </div>
              <div className="max-h-0 overflow-hidden py-0 group-hover:py-1 group-hover:max-h-80 md:absolute md:block left-2 md:py-1 shadow-md bg-white border rounded-md opacity-0 pointer-events-none group-hover:pointer-events-auto group-hover:opacity-100 min-w-32 md:group-hover:top-full transition-all duration-500 top-[110%]">
                <Link className="block p-1 px-3" href="/category/plot?type=buy">
                  Plot
                </Link>
                <Link
                  className="block p-1 px-3"
                  href="/category/industrial?type=buy"
                >
                  Industrial
                </Link>
                <Link
                  className="block p-1 px-3"
                  href="/category/commercial?type=buy"
                >
                  Commercial
                </Link>
                <Link
                  className="block p-1 px-3"
                  href="/category/residential?type=buy"
                >
                  Residential
                </Link>

                <Link
                  className="block p-1 px-3"
                  href="/category/agricultural?type=buy"
                >
                  Agricultural
                </Link>
              </div>
            </label>

            <label className="relative block p-2 group md:inline-block">
              <div className="flex items-center justify-between cursor-pointer">
                Rent<i className="text-xl bx bx-chevron-down"></i>
              </div>
              <div className="max-h-0 overflow-hidden py-0 group-hover:py-1 group-hover:max-h-80 md:absolute md:block left-2 md:py-1 shadow-md bg-white border rounded-md opacity-0 pointer-events-none group-hover:pointer-events-auto group-hover:opacity-100 min-w-32 md:group-hover:top-full transition-all duration-500 top-[110%]">
                <Link
                  className="block p-1 px-3"
                  href="/category/plot?type=rent"
                >
                  Plot
                </Link>
                <Link
                  className="block p-1 px-3"
                  href="/category/industrial?type=rent"
                >
                  Industrial
                </Link>
                <Link
                  className="block p-1 px-3"
                  href="/category/commercial?type=rent"
                >
                  Commercial
                </Link>
                <Link
                  className="block p-1 px-3"
                  href="/category/residential?type=rent"
                >
                  Residential
                </Link>

                <Link
                  className="block p-1 px-3"
                  href="/category/agricultural?type=rent"
                >
                  Agricultural
                </Link>
              </div>
            </label>

            <Link className="block p-2 md:inline-block" href="/Marketplace">
              Marketplace
            </Link>

            <Link className="block p-2 md:inline-block" href="/GroupSell">
              Group Sell
            </Link>

            <Link className="block p-2 md:inline-block" href="/">
              Investor
            </Link>

            <Link className="block p-2 md:inline-block" href="/legal-advisor">
              Legal Advisor
            </Link>

            {user && (
              <>
                {user.userType === "Vendor" ? (
                  <Link
                    className="block p-2 md:inline-block"
                    href="/portal/my-properties2"
                  >
                    My Listing
                  </Link>
                ) : (
                  <Link
                    className="block p-2 md:inline-block"
                    href="/portal/my-properties"
                  >
                    My properties
                  </Link>
                )}
              </>
            )}

            {user && (
              <>
                {user.userType === "Vendor" && (
                  <Link
                    className="px-2 py-1 bg-primary text-white border rounded-md border-primary md:inline-block"
                    href="/portal/products"
                  >
                    Products List
                  </Link>
                )}
              </>
            )}


            {user && user.userType === "Admin" && (
              <label className="relative block p-2 group md:inline-block">
                <Link href="/portal/admin">
                  <div className="flex items-center justify-between cursor-pointer">
                    Admin<i className="text-xl bx bx-chevron-down"></i>
                  </div>
                </Link>
                <div className="max-h-0 overflow-hidden py-0 group-hover:py-1 group-hover:max-h-80 md:absolute md:block left-2 md:py-1 shadow-md bg-white border rounded-md opacity-0 pointer-events-none group-hover:pointer-events-auto group-hover:opacity-100 min-w-32 md:group-hover:top-full transition-all duration-500 top-[110%]">
                  <Link
                    className="block p-1 px-3"
                    href="/portal/manageReferral"
                  >
                    Update Membership
                  </Link>
                  <Link
                    className="block p-1 px-3"
                    href="/portal/recharge-wallet"
                  >
                    Recharge Wallet
                  </Link>
                  <Link
                    className="block p-1 px-3"
                    href="/portal/paid-user"
                  >
                    Paid User
                  </Link>
                  <Link
                    className="block p-1 px-3"
                    href="/portal/manageUser"
                  >
                    Manage User
                  </Link>
                </div>
              </label>
            )}
          </div>
          <div onClick={()=>setShowSideCart(true)} className="block mt-2 md:inline-block relative cursor-pointer">
              <i className={`text-3xl text-black bx bx-cart`}></i>
              <div className="absolute bg-primary top-0 right-0 translate-x-1/2 -translate-y-1/2 w-5 h-5 rounded-full flex justify-center items-center text-xs text-white">
                {cartItems.length | 0}
              </div>
          </div>
          <div className="relative">
            {!user ? (
              <div className="flex gap-2">
                <Link
                  className="px-2 py-1 text-primary border rounded-md border-primary"
                  href="/login"
                >
                  Log In
                </Link>
                <Link
                  className="px-2 py-1 text-white border rounded-md bg-primary border-primary"
                  href="/register"
                >
                  Sign up
                </Link>
              </div>
            ) : (
              <div
                onClick={() => setShowProfile(true)}
                className="w-8 cursor-pointer h-8  border rounded-full overflow-hidden"
              >
                <img
                  src={user.photo || "/images/user.png"}
                  className="h-full w-full object-cover"
                  alt=""
                />
              </div>
            )}

            {showProfile && (
              <div>
                <div
                  onClick={() => setShowProfile(false)}
                  className={`bg-transparent duration-500 transition-all top-0 left-0 w-[100%] h-[100vh] fixed`}
                ></div>

                <div className="absolute top-[110%] right-0 min-w-52 z-20 py-4 shadow-[0px_0px_5px_2px_#ddd] bg-white rounded-md">
                  <div className="flex flex-col justify-center items-center">
                    <div className="w-20 h-20 border mb-2 rounded-full overflow-hidden">
                      <img
                        src={user.photo || "/images/user.png"}
                        className="w-full h-full object-cover"
                        alt=""
                      />
                    </div>
                    <div className="font-semibold text-lg">
                      {user?.fullName}
                    </div>
                    <div className="text-sm">{user?.userType}</div>
                  </div>

                  <div className="pt-4">
                    <Link href="/portal/profile">
                      <div className="flex items-center hover:bg-gray-100 px-4 py-2">
                        <i className="bx bx-user text-xl mr-2"></i>

                        <div className="text-sm">Profile</div>
                      </div>
                    </Link>

                    {(user?.userType === "Buyer" ||
                      user?.userType === "Seller") && (
                      <Link href="/portal/PaymentStatus">
                        <div className="flex items-center hover:bg-gray-100 px-4 py-2">
                          <i className="bx bx-wallet-alt text-xl mr-2"></i>
                          <div className="text-sm">Payment Status</div>
                        </div>
                      </Link>
                    )}

                    {(user?.userType === "Buyer" ||
                      user?.userType === "Seller") && (
                      <Link href="/portal/Wallet">
                        <div className="flex items-center hover:bg-gray-100 px-4 py-2">
                          <i className="bx bx-wallet-alt text-xl mr-2"></i>
                          <div className="text-sm">Wallet</div>
                        </div>
                      </Link>
                    )}

                    {user && (
                      <>
                        {user.userType === "Vendor" ? (
                          <Link href="/portal/my-properties2">
                            <div className="flex items-center hover:bg-gray-100 px-4 py-2">
                              <i className="bx bx-home text-xl mr-2"></i>
                              <div className="text-sm">My Listing</div>
                            </div>
                          </Link>
                        ) : (
                          <Link href="/portal/my-properties">
                            <div className="flex items-center hover:bg-gray-100 px-4 py-2">
                              <i className="bx bx-home text-xl mr-2"></i>
                              <div className="text-sm">My Properties</div>
                            </div>
                          </Link>
                        )}
                      </>
                    )}
                    <Link href="/portal/orders">
                            <div className="flex items-center hover:bg-gray-100 px-4 py-2">
                              <i className="bx bx-basket text-xl mr-2"></i>
                              <div className="text-sm">My Order</div>
                            </div>
                          </Link>

                    {(user?.userType === "Buyer" ||
                      user?.userType === "Seller") && (
                      <Link href="/referral-program">
                        <div className="flex items-center hover:bg-gray-100 px-4 py-2">
                          <i className="bx bx-rupee text-xl mr-2"></i>
                          <div className="text-sm">Refer & Earn</div>
                        </div>
                      </Link>
                    )}

                    {(user?.userType === "Buyer" ||
                      user?.userType === "Seller") && (
                      <Link href="/portal/Reference">
                        <div className="flex items-center hover:bg-gray-100 px-4 py-2">
                          <i className="bx bx-rupee text-xl mr-2"></i>
                          <div className="text-sm">My Earning</div>
                        </div>
                      </Link>
                    )}

                    <Link
                      href={
                        user?.userType == "Buyer"
                          ? "/buyer-paid-membership"
                          : "/seller-paid-membership"
                      }
                    >
                      <div className="flex items-center hover:bg-gray-100 px-4 py-2">
                        <i className="bx bx-medal text-xl mr-2"></i>
                        <div className="text-sm">Paid Membership</div>
                      </div>
                    </Link>

                    <div
                      onClick={handleLogout}
                      className="flex items-center cursor-pointer hover:bg-gray-100 px-4 py-2"
                    >
                      <i className="bx bx-log-out text-xl mr-2"></i>
                      <div className="text-sm">Logout</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
