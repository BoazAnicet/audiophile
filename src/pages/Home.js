import React from "react";
import Categories from "../components/Categories";
import Header from "../components/Header";
import Footer from "../components/Footer";
import BestGear from "../components/BestGear";
import { Link } from "react-router-dom";
import zx9Desktop from "../assets/home/desktop/image-speaker-zx9.png";
import zx9Tablet from "../assets/home/tablet/image-speaker-zx9.png";
import zx9Mobile from "../assets/home/mobile/image-speaker-zx9.png";
import yx1Desktop from "../assets/home/desktop/image-earphones-yx1.jpg";
import yx1Tablet from "../assets/home/tablet/image-earphones-yx1.jpg";
import yx1Mobile from "../assets/home/mobile/image-earphones-yx1.jpg";
import { useMediaQuery } from "../utils/useMediaQuery";

const Home = () => {
  let isWidthLessThan768px = useMediaQuery("(max-width: 767.98px)");
  let isWidthLessThan475px = useMediaQuery("(max-width: 475.98px)");

  return (
    <>
      <Header />
      <main id="index">
        <section className="hero">
          <div className="container">
            <div className="text">
              <div className="overline">new product</div>
              <h1>xx99 mark ii headphones</h1>
              <div className="description">
                Experience natural, lifelike audio and exceptional build quality made for the
                passionate music enthusiast.
              </div>
              <Link className="btn one" to="/product/xx99-mark-two-headphones">
                See product
              </Link>
            </div>
          </div>
        </section>

        <Categories />

        <section>
          <h2 style={{ color: "#FF0000" }}>{document.width}</h2>
        </section>

        <section id="products">
          <div className="container">
            <div className="zx9">
              <img
                src={
                  isWidthLessThan475px ? zx9Mobile : isWidthLessThan768px ? zx9Tablet : zx9Desktop
                }
                alt="ZX9 Speaker"
              />
              <div className="text">
                <h1>ZX9 Speaker</h1>
                <div className="description">
                  Upgrade to premium speakers that are phenomenally built to deliver truly
                  remarkable sound.
                </div>
                <Link className="btn two" to="/product/zx9-speaker">
                  See product
                </Link>
              </div>
            </div>

            <div className="zx7">
              <div className="text">
                <h3>ZX7 SPEAKER</h3>
                <Link className="btn two" to="/product/zx7-speaker">
                  See product
                </Link>
              </div>
            </div>

            <div className="yx1">
              <div className="image">
                <img
                  src={
                    isWidthLessThan475px ? yx1Mobile : isWidthLessThan768px ? yx1Tablet : yx1Desktop
                  }
                  alt="YX1 Earphones"
                />
              </div>
              <div className="text">
                <div>
                  <h3>YX1 EARPHONES</h3>
                  <Link className="btn two" to="/category/earphones">
                    See product
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <BestGear />
      </main>

      <Footer />
    </>
  );
};

export default Home;
