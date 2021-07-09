import React, { useContext, useEffect, useState, useRef } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { CartContext } from "../contexts/CartContext";
import nwc from "../utils/numberWithCommas";
import { useHistory } from "react-router-dom";

const removeUselessWords = (txt) => {
  let uselessWordsArray = ["headphones", "speaker", "earphones", "wireless"];

  let expStr = uselessWordsArray.join("|");

  return txt
    .replace(new RegExp("\\b(" + expStr + ")\\b", "gi"), " ")
    .replace(/\s{2,}/g, " ")
    .replace("Mark", "MK");
};

const Checkout = () => {
  const { total, cartItems } = useContext(CartContext);
  const [modalOpen, setModalOpen] = useState(false);
  const [eMoneyChecked, setEmoneyChecked] = useState(false);
  const [codChecked, setCodChecked] = useState(false);
  const eMoney = useRef(null);
  const cod = useRef(null);
  const history = useHistory();

  useEffect(() => {
    let body = document.getElementById("body");

    modalOpen ? (body.style = "overflow-y: hidden") : (body.style = "overflow-y: scroll");
  }, [modalOpen]);

  useEffect(() => {
    eMoney.current.parentElement.addEventListener("click", () => {
      eMoney.current.parentElement.classList.add("border-chocolate");
      cod.current.parentElement.classList.remove("border-chocolate");
      setEmoneyChecked(true);
      setCodChecked(false);
    });

    cod.current.parentElement.addEventListener("click", () => {
      cod.current.parentElement.classList.add("border-chocolate");
      eMoney.current.parentElement.classList.remove("border-chocolate");
      setCodChecked(true);
      setEmoneyChecked(false);
    });
  }, []);

  const renderCart = () => {
    return cartItems.map((el, i) => {
      return (
        <li key={i}>
          <div style={{ display: "flex" }}>
            <img src={el.image.default} alt={el.name} />
            <div style={{ width: "100%" }}>
              <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                <div>{removeUselessWords(el.name)}</div>
                <div>x{el.quantity}</div>
              </div>
              <div className="price">{`$ ${nwc(el.price)}`}</div>
            </div>
          </div>
        </li>
      );
    });
  };

  return (
    <div style={{ backgroundColor: "#F1F1F1" }}>
      <Header />
      <main id="checkout">
        <div className="checkout-header" />

        <div className="container">
          <div className="go-back" onClick={() => history.goBack()}>
            Go Back
          </div>
          <div>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="checkout">
                <h2>CHECKOUT</h2>
                <div className="billing-details">
                  <div className="form-section-head">BILLING DETAILS</div>
                  <div className="inputs">
                    <InputGroup label="Name" placeholder="Alexei Ward" type="text" />
                    <InputGroup label="Email Address" placeholder="alexei@mail.com" type="email" />
                    <InputGroup label="Phone Number" placeholder="+1 202-555-0136" type="phone" />
                  </div>
                </div>

                <div className="shipping-info">
                  <div className="form-section-head">SHIPPING INFO</div>
                  <div className="inputs">
                    <InputGroup label="Address" placeholder="1137 Williams Avenue" type="text" />
                    <InputGroup label="Zip Code" placeholder="10001" type="text" />
                    <InputGroup label="City" placeholder="New York" type="text" />
                    <InputGroup label="Country" placeholder="United States" type="text" />
                  </div>
                </div>

                <div className="payment-details">
                  <div className="form-section-head">SHIPPING INFO</div>
                  <div className="inputs payment-methods">
                    <div>Payment Method</div>
                    <div>
                      <label class="radio-container">
                        <input ref={eMoney} type="radio" name="radio" className="radio" />
                        e-Money
                        <span class="checkmark" />
                      </label>
                      <label class="radio-container">
                        <input ref={cod} type="radio" name="radio" className="radio" />
                        Cash on Delivery
                        <span class="checkmark" />
                      </label>
                    </div>
                  </div>

                  {eMoneyChecked ? (
                    <div className="inputs emoney-checked">
                      <InputGroup label="e-Money Number" placeholder="238521993" type="text" />
                      <InputGroup label="e-Money PIN" placeholder="6891" type="text" />
                    </div>
                  ) : (
                    <></>
                  )}

                  {codChecked ? (
                    <div className="cod-checked">
                      <p>
                        The ‘Cash on Delivery’ option enables you to pay in cash when our delivery
                        courier arrives at your residence. Just make sure your address is correct so
                        that your order will not be cancelled.
                      </p>
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              </div>

              <div className="summary">
                <h6>SUMMARY</h6>
                <ul>{renderCart()}</ul>
                <div className="total">
                  <h6>TOTAL</h6>
                  <div>$ {nwc(total)}</div>
                </div>
                <div className="total">
                  <h6>SHIPPING</h6>
                  <div>$ 50.00</div>
                </div>
                <div className="total">
                  <h6>VAT (INCLUDED)</h6>
                  <div>$ {(total * 0.2).toFixed(2)}</div>
                </div>
                <div className="total" style={{ marginTop: "32px", marginBottom: "32px" }}>
                  <h6>GRAND TOTAL</h6>
                  <div style={{ color: "#D87D4A" }}>
                    ${" "}
                    {nwc(
                      (parseFloat(total) + parseFloat((total * 0.2).toFixed(2)) + 50).toFixed(2)
                    )}
                  </div>
                </div>
                <button className="btn one" onClick={() => setModalOpen(true)}>
                  Continue & Pay
                </button>
              </div>
            </form>
          </div>
        </div>
        {modalOpen ? <CheckoutModal /> : <></>}
      </main>

      <Footer />
    </div>
  );
};

const InputGroup = ({ label, placeholder, type }) => {
  return (
    <div className="input-group">
      <label htmlFor={label.split(" ").join("-").toLowerCase()}>{label}</label>
      <input
        name={label.split(" ").join("-").toLowerCase()}
        placeholder={placeholder || ""}
        type={type}
        id={label.split(" ").join("-").toLowerCase()}
      />
    </div>
  );
};

const CheckoutModal = () => {
  const history = useHistory();
  const { total, cartItems } = useContext(CartContext);
  const [showOtherItems, setShowOtherItems] = useState(false);

  useEffect(() => {
    if (cartItems.length < 1) {
      history.push("/");
    }

    if (cartItems.length === 1) {
      setShowOtherItems(true);
    }

    // eslint-disable-next-line
  }, []);

  const renderItems = () => {
    if (!showOtherItems) {
      let { image, quantity, name, price } = cartItems[0];
      return (
        <li key={0}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <img src={image.default} alt={name} />
            <div className="text" style={{ width: "100%" }}>
              <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                <div>{removeUselessWords(name)}</div>
                <div>x{quantity}</div>
              </div>
              <div className="price">{`$ ${nwc(price)}`}</div>
            </div>
          </div>
        </li>
      );
    }

    return cartItems.map((el, i) => {
      return (
        <li key={i}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <img src={el.image.default} alt={el.name} />
            <div className="text" style={{ width: "100%" }}>
              <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                <div>{removeUselessWords(el.name)}</div>
                <div>x{el.quantity}</div>
              </div>
              <div className="price">{`$ ${nwc(el.price)}`}</div>
            </div>
          </div>
        </li>
      );
    });
  };

  return (
    <div className="checkout-modal">
      <div className="modal-content">
        <div className="checkmark-icon">&#10003;</div>
        <h3>
          Thank you
          <br />
          for your order
        </h3>
        <p className="email-confirm">You will receive an email confirmation shortly.</p>
        <div className="items-and-total">
          <div className="items">
            <ul>{renderItems()}</ul>
            {!showOtherItems ? (
              <div className="other-items" onClick={() => setShowOtherItems(true)}>
                and {cartItems.length - 1} other item(s)
              </div>
            ) : cartItems.length > 1 ? (
              <div className="other-items" onClick={() => setShowOtherItems(false)}>
                Show less
              </div>
            ) : (
              <></>
            )}
          </div>
          <div className="total">
            <div className="grand-total">GRAND TOTAL</div>
            <div style={{ fontSize: "18px" }}>
              $ {nwc((parseFloat(total) + parseFloat((total * 0.2).toFixed(2)) + 50).toFixed(2))}
            </div>
          </div>
        </div>
        <button className="btn one a" onClick={() => history.push("/")}>
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default Checkout;
