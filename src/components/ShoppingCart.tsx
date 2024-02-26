import { useContext } from "react";
import { Offcanvas, Stack } from "react-bootstrap";

import { ShoppingCartContext } from "../store/shoppingCartContext";
import { CartItem } from "./CartItem";

export function ShoppingCart() {
  const shoppingCartCtx = useContext(ShoppingCartContext);
  const { closeCart, cartItems } = shoppingCartCtx;

  return (
    <Offcanvas show={true} placement="end" onHide={closeCart}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Stack gap={3}>
          {cartItems.map((item) => (
            <CartItem key={item.id} {...item} />
          ))}
        </Stack>
      </Offcanvas.Body>
    </Offcanvas>
  );
}
