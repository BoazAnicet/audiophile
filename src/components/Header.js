import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/shared/desktop/logo.svg";
import iconCart from "../assets/shared/desktop/icon-cart.svg";
import iconHamburger from "../assets/shared/tablet/icon-hamburger.svg";
import Cart from "./Cart";
import iconArrowRight from "../assets/shared/desktop/icon-arrow-right.svg";
import imageHeadphonesDesktop from "../assets/shared/desktop/image-headphones.png";
import imageSpeakers from "../assets/shared/desktop/image-speakers.png";
import imageEarphones from "../assets/shared/desktop/image-earphones.png";

const Header = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setCartOpen(false);

    if (window.innerWidth > 768) {
      setMenuOpen(false);
    }
  }, []);

  useEffect(() => {
    let body = document.getElementById("body");

    menuOpen || cartOpen
      ? (body.style = "overflow-y: hidden")
      : (body.style = "overflow-y: scroll");
  }, [menuOpen, cartOpen]);

  return (
    <>
      <div className="header">
        {menuOpen && <Menu />}
        <div className="container">
          <div className="links">
            <div className="logo">
              <div className="hamburger-menu" onClick={() => setMenuOpen(!menuOpen)}>
                <img src={iconHamburger} alt="Audiophile" id="menu-icon" />
              </div>
              <img src={logo} alt="Audiophile" />
            </div>
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

const Menu = () => {
  return (
    <div className="menu">
      <div className="categories">
        <div className="container">
          <div className="links">
            <div className="category">
              <img className="category-img" src={imageHeadphonesDesktop} alt="Headphones" />
              <h6>Headphones</h6>
              <Link to="/category/headphones">
                Shop <img src={iconArrowRight} alt="" />
              </Link>
            </div>
            <div className="category">
              <img className="category-img" src={imageSpeakers} alt="Speaker" />
              <h6>Speakers</h6>
              <Link to="/category/speakers">
                Shop <img src={iconArrowRight} alt="" />
              </Link>
            </div>
            <div className="category">
              <img className="category-img" src={imageEarphones} alt="Earphone" />
              <h6>Earphones</h6>
              <Link to="/category/earphones">
                Shop <img src={iconArrowRight} alt="" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
