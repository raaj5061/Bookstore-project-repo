import React, { useContext } from "react";
import Card from "./Card";
import { cartContextObj } from "../Context/CartContext";
import { userContextObj } from "../Context/UserContext";
import { useNavigate } from "react-router";
function Cart() {
  const { cart } = useContext(cartContextObj);
  const { currentUser } = useContext(userContextObj);

  let navigator = useNavigate();
  function handleNavigate() {
    navigator("/checkout");
  }

  return (
    <div className="container">
      <div className="container mb-5 mt-5">
        <div className="carder col-sm-10">
          <h3 className="text-muted">Hello {currentUser?.username}</h3>
        </div>
      </div>
      <table className="table">
        <tbody >
          {cart.map((book) => (
          <tr key={book.id}>
            <td  className="col-sm-8">
              <Card isCart={true} book={book} />
            </td>
            </tr>
          ))}
      </tbody>
      </table>
      <div className="container carder mb-3">
        <h2> Feel like checking out?</h2>
        <button className="btn btn-primary " onClick={handleNavigate}>
          Checkout
        </button>
      </div>
    </div>
  );
}

export default Cart;
