import { useContext } from "react";
import { Button, Stack } from "react-bootstrap";

import storeItems from "../data/items.json";
import { ShoppingCartContext } from "../store/shoppingCartContext";
import { formatCurrency } from "../utilities/formatCurrency";

type CartItemProps = {
  id: number;
  quantity: number;
};

export function CartItem(props: CartItemProps) {
  const { id, quantity } = props;

  const shoppingCartCtx = useContext(ShoppingCartContext);
  const { removeFromCart } = shoppingCartCtx;

  const item = storeItems.find((item) => item.id === id);
  if (!item) return <></>;

  return (
    <Stack direction="horizontal" gap={2}>
      <img
        alt={item.name}
        src={item.imgUrl}
        style={{
          height: "75px",
          width: "125px",
          objectFit: "cover",
        }}
      />
      <div className="me-auto">
        <div>
          {item.name}{" "}
          {quantity > 1 && <span className="text-muted">x{quantity}</span>}
        </div>
        <div className="text-muted">{formatCurrency(item.price)}</div>
      </div>
      <div>{formatCurrency(quantity * item.price)}</div>
      <Button variant="outline-danger" size="sm" onClick={() => removeFromCart(id)}>
        x
      </Button>
    </Stack>
  );
}
