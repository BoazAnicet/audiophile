import React from "react";
import Categories from "../components/Categories";
import Header from "../components/Header";
import Footer from "../components/Footer";
import BestGear from "../components/BestGear";
import zx9 from "../assets/home/desktop/image-speaker-zx9.png";
import yx1 from "../assets/home/desktop/image-earphones-yx1.jpg";

const Home = () => {
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
              <button className="btn one">See product</button>
            </div>
          </div>
        </section>

        <Categories />

        <section id="products">
          <div className="container">
            <div className="zx9">
              <img src={zx9} alt="ZX9 Speaker" />
              <div className="text">
                <h1>ZX9 Speaker</h1>
                <div>
                  Upgrade to premium speakers that are phenomenally built to deliver truly
                  remarkable sound.
                </div>
                <button className="btn two">See product</button>
              </div>
            </div>

            <div className="zx7">
              <div className="text">
                <h3>ZX7 SPEAKER</h3>
                <button className="btn two">See product</button>
              </div>
            </div>

            <div className="yx1">
              <div className="image">
                <img src={yx1} alt="YX1 Earphones" />
              </div>
              <div className="text">
                <div>
                  <h3>YX1 EARPHONES</h3>
                  <button className="btn two">See product</button>
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
