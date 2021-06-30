import React, { useContext } from "react";
import { CartContext } from "../contexts/CartContext";

const Counter = ({ product }) => {
  const { increase, decrease } = useContext(CartContext);

  return (
    <div className="counter">
      <div className="decrementor" onClick={() => product.quantity >= 1 && decrease(product)}>
        -
      </div>

      <div className="value">{product.quantity}</div>

      <div className="incrementor" onClick={() => increase(product)}>
        +
      </div>
    </div>
  );
};

export default Counter;
