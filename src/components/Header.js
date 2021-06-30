import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/shared/desktop/logo.svg";
import iconCart from "../assets/shared/desktop/icon-cart.svg";
import Cart from "./Cart";

const Header = () => {
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    setCartOpen(false);
  }, []);

  useEffect(() => {
    let body = document.getElementById("body");

    cartOpen ? (body.style = "overflow: hidden") : (body.style = "overflow: scroll");
  }, [cartOpen]);

  return (
    <>
      <div className="header">
        <div className="container">
          <div className="links">
            <img src={logo} alt="Audiophile" />
            <ul>
              <li>
                <Link to="/">
                  <h6>Home</h6>
                </Link>
              </li>
              <li>
                <Link to="/category/headphones">
                  <h6>Headphones</h6>
                </Link>
              </li>
              <li>
                <Link to="/category/speakers">
                  <h6>Speakers</h6>
                </Link>
              </li>
              <li>
                <Link to="/category/earphones">
                  <h6>Earphones</h6>
                </Link>
              </li>
            </ul>
            <div onClick={() => setCartOpen(!cartOpen)}>
              <img src={iconCart} alt="cart" />
            </div>
          </div>
        </div>
      </div>
      {cartOpen && <Cart />}
    </>
  );
};

export default Header;
