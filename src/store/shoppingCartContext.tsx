import React, { ReactNode, createContext, useState } from "react";
import { ShoppingCart } from "../components/ShoppingCart";

type ShoppingCartProviderProps = {
  children: ReactNode;
};

type CartItem = {
  id: number;
  quantity: number;
};

type ShoppingCartContext = {
  openCart: () => void;
  closeCart: () => void;
  getItemQuantity: (id: number) => number;
  increaseCarQuantity: (id: number) => void;
  decreaseCartQuantity: (id: number) => void;
  removeFromCart: (id: number) => void;
  cartQuantity: number;
  cartItems: CartItem[];
};

// an object that contains a react component
export const ShoppingCartContext = createContext({} as ShoppingCartContext);

export const ShoppingCartProvider = ({
  children,
}: ShoppingCartProviderProps) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const cartQuantity = cartItems.reduce(
    (quanity, item) => quanity + item.quantity,
    0
  );

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const getItemQuantity = (id: number) => {
    return cartItems.find((item) => item.id === id)?.quantity || 0;
  };
  const increaseCarQuantity = (id: number) => {
    setCartItems((currentItems) => {
      const targetItemIndex = currentItems.findIndex((item) => item.id === id);
      const updatedCartItems = [...currentItems];

      if (targetItemIndex !== -1) {
        updatedCartItems[targetItemIndex].quantity += 1;
      } else {
        updatedCartItems.push({
          id,
          quantity: 1,
        });
      }

      return updatedCartItems;
    });
  };
  const decreaseCartQuantity = (id: number) => {
    setCartItems((currentItems) => {
      const targetItemIndex = currentItems.findIndex((item) => item.id === id);
      const updatedCartItems = [...currentItems];

      if (currentItems[targetItemIndex].quantity === 1) {
        return updatedCartItems.filter((item) => item.id !== id);
      } else {
        updatedCartItems[targetItemIndex].quantity -= 1;
        return updatedCartItems;
      }
    });
  };
  const removeFromCart = (id: number) => {
    setCartItems((currentItems) =>
      currentItems.filter((item) => item.id !== id)
    );
  };

  return (
    <ShoppingCartContext.Provider
      value={{
        openCart,
        closeCart,
        getItemQuantity,
        increaseCarQuantity,
        decreaseCartQuantity,
        removeFromCart,
        cartQuantity,
        cartItems,
      }}
    >
      {children}
      {isCartOpen && <ShoppingCart />}
    </ShoppingCartContext.Provider>
  );
};
