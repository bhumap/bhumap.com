import React, { useContext } from "react";
import { CartContext } from "@/src/context/CartContext";
import Ripple from "material-ripple-effects";
import Link from "next/link";
import { AuthContext } from "@/src/context/AuthContext";
import Image from "next/image";

const CartSideBar = () => {
  const { user } = useContext(AuthContext);
  const ripple = new Ripple();
  const {
    cartItems,
    addToCart,
    decreaseFromCart,
    removeFromCart,
    showSideCart,
    setShowSideCart,
    calculateTotal,
  } = useContext(CartContext);

  // Function to calculate total count of items and delivery charges
  const calculateTotals = () => {
    let uniqueChefIds = new Set();
    let totalCount = 0;

    // Count items and unique chef IDs
    cartItems.forEach((item) => {
      totalCount += item.quantity;
      uniqueChefIds.add(item._id); // Add ID to the set
    });
    console.log(cartItems.length);
    // Calculate delivery charges based on unique chef count
    const uniqueChefCount = uniqueChefIds.size;
    const deliveryCharges = uniqueChefCount * parseInt(process.env.NEXT_PUBLIC_SHIPPING_COST);

    return { totalCount, deliveryCharges };
  };

  return (
    <div
      className={`fixed ${
        showSideCart ? "visible" : "invisible"
      } flex justify-end inset-0 z-[999999999] pt-20 sm:pt-0 bg-black/50`}
    >
      <div
        onClick={() => setShowSideCart(false)}
        className={`${
          showSideCart ? "opacity-100" : "opacity-0"
        } transition-all duration-300 bg-black/50 absolute inset-0`}
      ></div>

      <div
        className={`bg-white ${
          showSideCart
            ? "translate-x-0" // No translate when open
            : "translate-x-full delay-300" // Translate off-screen when closed
        } flex flex-col transition-all duration-500 h-screen w-full sm:w-[300px] lg:w-[400px] xl:w-[500px]`}
      >
        <div className="items-center p-4 flex justify-between bg-gray-100 border-b border-gray-300 rounded-t-xl">
        <h2 className="font-semibold text-xl sm:text-2xl text-gray-800">
            Cart Items
        </h2>
        <div
            onClick={() => setShowSideCart(false)}
            className="p-1 rounded-full w-8 h-8 flex justify-center items-center bg-red-600 text-white cursor-pointer hover:bg-red-700 transition duration-200"
        >
            <i className="bx text-2xl bx-x"></i>
        </div>
        </div>

        <div className="flex-1 px-4 overflow-auto">
          <div>
            {cartItems.map((v, i) => {
              return (
                <div key={i} className="border-b py-2">
                  <div className="flex gap-2 mb-2 shrink-[none]">
                    <div className="w-20 borer">
                      <Image
                        width={600}
                        height={600}
                        className="aspect-video object-cover w-full border bg-gray-100 rounded-[.25rem]"
                        src={v?.images[0]?.secure_url || "/images/image.png"}
                        alt=""
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col mb-2 items-start gap-1">
                        <div className="flex w-full justify-between">
                          <p className="line-clamp-2">{v.name}</p>
                          <p className="whitespace-nowrap">Single {v.uom} : ₹ {v.price}</p>
                        </div>
                      </div>
                      <div className="flex flex-col mb-2 items-start gap-1">
                        <div className="flex w-full justify-between">
                          <p className="line-clamp-2">Min. Order Quantity : {v.min_qty}</p>
                          {/* <p className="whitespace-nowrap">₹ {v.price}</p> */}
                        </div>
                      </div>
                      <p className="whitespace-nowrap font-medium">
                        Subtotal ({v.quantity} {v.min_qty >= 2 ? "items" : "item"}): ₹ {(v.price * v.min_qty) * v.quantity}
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <div
                      onClick={() => removeFromCart(v._id)}
                      className="cursor-pointer bg-gray-100 hover:bg-red-200 flex gap-1 items-center text-xs rounded-full px-4 py-1"
                    >
                      <i className="bx bx-trash"></i>Remove
                    </div>
                    <div className="flex justify-end items-center overflow-hidden">
                      <div
                        onClick={() => decreaseFromCart(v)}
                        className="flex justify-center items-center rounded-full w-8 h-8 cursor-pointer select-none text-xl border hover:bg-gray-100"
                      >
                        -
                      </div>
                      <div className="px-2">{v.quantity}</div>
                      <div
                        onClick={() => addToCart(v)}
                        className="flex justify-center items-center rounded-full w-8 h-8 cursor-pointer select-none text-xl border hover:bg-gray-100"
                      >
                        +
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {cartItems.length ? (
            <div className="p-7 pb-40 sm:pb-4 relative z-10 shadow-[0px_-2px_20px_1px_#0002] bg-gray-100">
            <div className="flex justify-between sm:text-xl mb-2">
                <p className="text-sm">Subtotal</p>
                <p className="text-sm">₹ {calculateTotal()}</p>
            </div>
            <div className="flex justify-between sm:text-xl mb-2">
                <p className="text-sm">{process.env.NEXT_PUBLIC_GST_PERCENTAGE * 100}% GST</p>
                <p className="text-sm">₹ {(process.env.NEXT_PUBLIC_GST_PERCENTAGE * calculateTotal()).toFixed(0)}</p>
            </div>
            <div className="flex justify-between sm:text-xl mb-2"></div>
            <div className="flex justify-between sm:text-xl font-semibold mb-2">
                <p>Total</p>
                <p>
                ₹ {
                    parseInt((process.env.NEXT_PUBLIC_GST_PERCENTAGE * calculateTotal()).toFixed(0)) +
                    parseInt(calculateTotal()) +
                    parseInt(calculateTotals()?.deliveryCharges)
                }
                </p>
            </div>
            <Link
            href={user ? "/checkout" : "/login"}
            onMouseUp={(e) => ripple.create(e, "light")}
            className="bg-primary text-center block text-white rounded-md w-full px-2 py-3"
            >
            Proceed to Checkout
            </Link>
            </div>
        ) : <div className="flex flex-col items-center justify-center p-7 pb-40 sm:pb-4 bg-gray-100 text-center relative z-10">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Cart is Empty</h2>
        <p className="text-gray-600 mb-2">It looks like you haven&apos;t added anything to your cart yet.</p>
        <Link
          href="/Marketplace"
          className="bg-primary text-white rounded-md px-4 py-2 mt-4"
        >
          Start Shopping
        </Link>
      </div>}
      </div>
    </div>
  );
};

export default CartSideBar;
