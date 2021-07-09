import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import BestGear from "../components/BestGear";
import Categories from "../components/Categories";
import Footer from "../components/Footer";
import data from "../data.js";
import { useParams, useHistory } from "react-router-dom";
import { useMediaQuery } from "../utils/useMediaQuery";
import { CartContext } from "../contexts/CartContext";
import numberWithCommas from "../utils/numberWithCommas";

const Product = () => {
  const { slug } = useParams();
  let product = data.find((el) => el.slug === slug);
  const { addProduct, cartItems } = useContext(CartContext);
  let isWidthLessThan768px = useMediaQuery("(max-width: 767.98px)");
  let isWidthLessThan475px = useMediaQuery("(max-width: 474.98px)");

  const history = useHistory();
  const [quantity, setQuantity] = useState(1);

  const renderIncludes = () => {
    return product.includes.map((el, i) => (
      <li key={i}>
        <span>{el.quantity}x</span>
        {el.item}
      </li>
    ));
  };

  const renderFeatures = () => {
    return product.features.split("\n\n").map((el, i) => {
      return <p key={i}>{el}</p>;
    });
  };

  const renderOtherProducts = () =>
    product.others.map((el, i) => (
      <div className="other-product" key={i}>
        <div className="image">
          <img
            src={`${isWidthLessThan768px ? el.image.tablet.default : el.image.desktop.default}`}
            alt={el.name}
          />
        </div>
        <h3>{el.name}</h3>
        <Link to={`/product/${el.slug}`} className="btn one">
          SEE PRODUCT
        </Link>
      </div>
    ));

  const Counter = () => {
    return (
      <div className="counter">
        <div className="decrementor" onClick={() => quantity >= 2 && setQuantity(quantity - 1)}>
          -
        </div>
        <div className="value">{quantity}</div>
        <div className="incrementor" onClick={() => setQuantity(quantity + 1)}>
          +
        </div>
      </div>
    );
  };

  const addToCart = () => {
    if (quantity === 0) return;

    addProduct({
      product: product.slug,
      quantity,
      image: require(`../assets/cart/image-${product.slug}.jpg`),
      price: product.price,
      name: product.name,
    });
  };

  return (
    <div>
      <Header />
      <main id="product-page">
        {product && (
          <>
            <div className="category-header" />

            <section className="product">
              <div className="container">
                <div className="go-back" onClick={() => history.goBack()}>
                  Go Back
                </div>
                <div className="content">
                  <img
                    src={
                      isWidthLessThan475px
                        ? product.image.mobile.default
                        : isWidthLessThan768px
                        ? product.image.tablet.default
                        : product.image.desktop.default
                    }
                    alt={product.name}
                  />
                  <div className="text">
                    {product.new && <div className="overline">NEW PRODUCT</div>}
                    <h2 className="name">{product.name}</h2>
                    <div className="description">{product.description}</div>
                    <h6 className="price">{`$ ${numberWithCommas(product.price)}`}</h6>
                    {cartItems.find((el) => el.name === product.name) ? (
                      <div>Added to cart!</div>
                    ) : (
                      <div className="buttons">
                        <Counter />
                        <button className="btn one" onClick={addToCart}>
                          Add To Cart
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </section>

            <section className="features">
              <div className="container">
                <div>
                  <h3>Features</h3>
                  {renderFeatures()}
                </div>
                <div>
                  <h3>In The Box</h3>
                  <ul>{renderIncludes()}</ul>
                </div>
              </div>
            </section>

            <section className="gallery">
              <div className="container">
                <div className="image">
                  <img
                    src={
                      isWidthLessThan475px
                        ? product.gallery.first.mobile.default
                        : isWidthLessThan768px
                        ? product.gallery.first.tablet.default
                        : product.gallery.first.desktop.default
                    }
                    alt={""}
                  />
                </div>
                <div className="image">
                  <img
                    src={
                      isWidthLessThan475px
                        ? product.gallery.second.mobile.default
                        : isWidthLessThan768px
                        ? product.gallery.second.tablet.default
                        : product.gallery.second.desktop.default
                    }
                    alt={""}
                  />
                </div>
                <div className="image">
                  <img
                    src={
                      isWidthLessThan475px
                        ? product.gallery.third.mobile.default
                        : isWidthLessThan768px
                        ? product.gallery.third.tablet.default
                        : product.gallery.third.desktop.default
                    }
                    alt={""}
                  />
                </div>
              </div>
            </section>

            <section className="may-like">
              <h3>YOU MAY ALSO LIKE</h3>
              <div className="container">
                <div className="other-products">{renderOtherProducts()}</div>
              </div>
            </section>
          </>
        )}

        <Categories />
        <BestGear />
      </main>
      <Footer />
    </div>
  );
};

export default Product;
