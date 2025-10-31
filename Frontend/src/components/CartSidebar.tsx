import { useContext } from "react";
import { Offcanvas, Button } from "react-bootstrap";
import { cartContextObj } from "../Context/CartContext";
import { useNavigate } from "react-router";

function CartSidebar() {
  const {
    cart,
    isCartOpen,
    closeCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
  } = useContext(cartContextObj);

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const navigate=useNavigate()
  const handleNavigate=()=>{
    navigate('/checkout')
  }
  return (
    <Offcanvas show={isCartOpen} onHide={closeCart} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Your Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        {cart.length > 0 ? (
          cart.map((item) => (
            <div key={item.id} className="d-flex align-items-center mb-3 pb-3">
              
              <div className="ms-3 me-auto">
                <h6 className="mt-0 mb-1">{item.bookname}</h6>
                <p className="text-muted mb-2">
                  Rs. {(item.price * item.quantity).toFixed(2)}
                </p>

                <div className="d-flex align-items-center">
                  <Button
                    variant="outline-secondary"
                    onClick={() => decreaseQuantity(item.id as string)}
                    className="btn-sm p-0 border-0"
                    style={{
                      width: "28px",
                      height: "28px",
                      lineHeight: "18px",
                      fontSize: "1.2rem",
                    }}
                  >
                    -
                  </Button>
                  <span
                    className="mx-2 fw-bold"
                    style={{ width: "20px", textAlign: "center" }}
                  >
                    {item.quantity}
                  </span>
                  <Button
                    variant="outline-secondary"
                    onClick={() => increaseQuantity(item.id as string)}
                    className="btn-sm p-0 border-0"
                    style={{
                      width: "28px",
                      height: "28px",
                      lineHeight: "18px",
                      fontSize: "1.2rem",
                    }}
                  >
                    +
                  </Button>
                </div>
              </div>
              <button
                className="btn btn-sm btn-danger ms-3"
                onClick={() => removeFromCart(item.id as string)}
                style={{ height: "32px" }}
              >
                Remove
              </button>
            </div>
          ))
        ) : (
          <p>Your cart is empty. Add some books 😊</p>
        )}
        {cart.length > 0 && (
          <div className="mt-4 pt-4 border-top">
            <div className="d-flex justify-content-between">
              <strong>Subtotal:</strong>
              <strong>Rs.{subtotal.toFixed(2)}</strong>
            </div>
            <button className="btn btn-success w-100 mt-3" onClick={handleNavigate}>
              Proceed to Checkout
            </button>
          </div>
        )}
      </Offcanvas.Body>
    </Offcanvas>
  );
}

export default CartSidebar;
