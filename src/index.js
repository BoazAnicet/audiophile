import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { HelmetProvider } from "react-helmet-async";
import ProductsContext from "./contexts/ProductsContext";
import CartContext from "./contexts/CartContext";

ReactDOM.render(
  <React.StrictMode>
    <HelmetProvider>
      <ProductsContext>
        <CartContext>
          <App />
        </CartContext>
      </ProductsContext>
    </HelmetProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
