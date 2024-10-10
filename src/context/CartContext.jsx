import CartSideBar from "@/src/components/common/CartSideBar";
import { usePathname } from "next/navigation";
import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

const CartProvider = ({ children }) => {

  const [showSideCart, setShowSideCart] = useState(false);
  var pathname = usePathname()

  const [cartItems, setCartItems] = useState([]);
  const [lat, setLat] = useState(102.55); // Changed initial state of data to null
  const [log, setLog] = useState(null); // Changed initial state of data to null

  const addToCart = (newItem) => {
    var cartCopy = [...cartItems];

    const alreadyExistedItem = cartCopy.find(
      (checkItem) => checkItem._id === newItem._id
    );

    if (alreadyExistedItem) {
      cartCopy = cartCopy.map((checkItem) =>
        checkItem._id === newItem._id
          ? {
              ...checkItem,
              quantity: checkItem.quantity + 1,

              totalPrice: (checkItem.quantity + 1) * checkItem.price,
            }
          : checkItem
      );
    } else {
      cartCopy.push({ ...newItem, quantity: 1, totalPrice: newItem.price });
    }

    localStorage.setItem("cartItems", JSON.stringify(cartCopy));

    setCartItems(cartCopy);
  };

  const decreaseFromCart = (ItemToRemove) => {
    var copyItem = [...cartItems];

    const IsItemCheckInCart = cartItems.find(
      (cartItem) => cartItem._id === ItemToRemove._id
    );

    if (IsItemCheckInCart.quantity === 1) {
      copyItem = cartItems.filter(
        (cartItem) => cartItem._id !== ItemToRemove._id
      );
    } else {
      copyItem = cartItems.map((cartItem) =>
        cartItem._id === ItemToRemove._id
          ? {
              ...cartItem,
              quantity: cartItem.quantity - 1,
              totalPrice: cartItem.totalPrice - cartItem.price,
            }
          : cartItem
      );
    }

    localStorage.setItem("cartItems", JSON.stringify(copyItem));

    setCartItems(copyItem);
  };

  const removeFromCart = (_id) => {
    const updatedCart = cartItems.filter((item) => item._id !== _id);
    setCartItems(updatedCart);

    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
  };

  const clearCart = () => {
    var copyCart = [];

    localStorage.setItem("cartItems", JSON.stringify(copyCart));

    setCartItems(copyCart);
  };

  const calculateTotal = () =>{
    var t = 0
    cartItems.map((v,i)=>{
      t = t + (v.price * v.quantity)
    })
    return t
  }

  useEffect(() => {
    const cartItems = localStorage.getItem("cartItems");
    if (cartItems) {
      setCartItems(JSON.parse(cartItems));
    }
  }, []);

  useEffect(()=>{
    if(showSideCart){
      document.body.style.overflow = "hidden"
    }else{
      document.body.style.overflow = "auto"
    }
  },[showSideCart])

  useEffect(()=>{
    setShowSideCart(false)
  },[pathname])

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        clearCart,
        decreaseFromCart,
        removeFromCart,
        showSideCart,
        setShowSideCart,
        calculateTotal,
        lat,
        setLat,
        log,
        setLog
      }}
    >
      <CartSideBar />
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;