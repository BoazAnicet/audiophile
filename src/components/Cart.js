import React, { useContext } from "react";
import { CartContext } from "../contexts/CartContext";
import Counter from "./Counter";
import removeFromString from "../utils/removeFromString";
import numberWithCommas from "../utils/numberWithCommas";
import { useHistory } from "react-router";

const Cart = () => {
  const { total, cartItems, itemCount, clearCart } = useContext(CartContext);
  const history = useHistory();

  const renderCart = () => {
    return cartItems.map((el, i) => {
      return (
        <li key={i}>
          <img src={el.image.default} alt={el.name} />

          <div className="text">
            <div>
              {removeFromString(
                ["speaker", "headphones", "earphones", "wireless"],
                el.name
              ).replace("Mark", "MK")}
            </div>
            <div>$ {el.price}</div>
          </div>

          <Counter product={el} />
        </li>
      );
    });
  };

  return (
    <div className="cart">
      <div className="cart-content">
        {cartItems.length > 0 ? (
          <>
            <div className="size">
              <div>CART ({itemCount})</div>
              <div onClick={clearCart} className="remove" on>
                Remove all
              </div>
            </div>
            <ul>{renderCart()}</ul>
            <div className="total">
              <div>TOTAL</div>
              <div>$ {numberWithCommas(total)}</div>
            </div>
            <button className="btn one a" onClick={() => history.push("/checkout")}>
              CHECKOUT
            </button>
          </>
        ) : (
          <div>Cart is empty</div>
        )}
      </div>
    </div>
  );
};

export default Cart;
