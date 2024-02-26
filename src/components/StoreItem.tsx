import { Button, Card } from "react-bootstrap";
import { formatCurrency } from "../utilities/formatCurrency";
import { useContext } from "react";
import { ShoppingCartContext } from "../store/shoppingCartContext";

type StoreItemProps = {
  id: number;
  name: string;
  price: number;
  imgUrl: string;
};

export function StoreItem(props: StoreItemProps) {
  const { id, name, price, imgUrl } = props;

  const shoppingCartCtx = useContext(ShoppingCartContext);
  const {
    removeFromCart,
    getItemQuantity,
    increaseCarQuantity,
    decreaseCartQuantity,
  } = shoppingCartCtx;

  const quantity = getItemQuantity(id);

  return (
    <Card className="h-100">
      <Card.Img
        variant="top"
        height="200px"
        src={imgUrl}
        style={{
          objectFit: "cover",
        }}
      />
      <Card.Body>
        <Card.Title className="d-flex justify-content-between align-items-center mb-4">
          <span className="fs-3">{name}</span>
          <span className="ml-2 text-muted">{formatCurrency(price)}</span>
        </Card.Title>
        <div>
          {quantity === 0 ? (
            <Button className="w-100" onClick={() => increaseCarQuantity(id)}>
              + Add to cart
            </Button>
          ) : (
            <div
              className="d-flex flex-column align-items-center"
              style={{
                gap: "0.5rem",
              }}
            >
              <div
                className="d-flex align-items-baseline justify-content-center"
                style={{
                  gap: "0.5rem",
                }}
              >
                <Button onClick={() => decreaseCartQuantity(id)}>-</Button>
                <div>
                  <span className="fs-4">{quantity}</span> in cart
                </div>
                <Button onClick={() => increaseCarQuantity(id)}>+</Button>
              </div>
              <Button
                variant="danger"
                size="sm"
                onClick={() => removeFromCart(id)}
              >
                Remove
              </Button>
            </div>
          )}
        </div>
      </Card.Body>
    </Card>
  );
}
