import { Link } from "react-router-dom";
import React from "react";
import iconArrowRight from "../assets/shared/desktop/icon-arrow-right.svg";
import imageHeadphonesDesktop from "../assets/shared/desktop/image-headphones.png";
import imageSpeakers from "../assets/shared/desktop/image-speakers.png";
import imageEarphones from "../assets/shared/desktop/image-earphones.png";

const Categories = () => {
  return (
    <section className="categories">
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
    </section>
  );
};

export default Categories;
