import { Link } from "react-router-dom";
import data from "../data.js";
import BestGear from "../components/BestGear";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useParams } from "react-router";
import { useMediaQuery } from "../utils/useMediaQuery";
import Categories from "../components/Categories";
import removeFromString from "../utils/removeFromString.js";

const Category = () => {
  const { category } = useParams();
  let isWidthLessThan475px = useMediaQuery("(max-width: 474.98px)");
  let isWidthLessThan768px = useMediaQuery("(max-width: 767.98px)");

  const products = data.filter((i) => i.category === category);

  const renderProducts = () => {
    return products.reverse().map((p, i) => {
      let image = (slug) => {
        return removeFromString(["-speaker", "-headphones"], slug) + ".jpg";
      };

      return (
        <Product
          key={i}
          newItem={p.new}
          name={p.name}
          description={p.description}
          image={
            isWidthLessThan475px
              ? require(`../assets/category-${category}/mobile/image-${image(p.slug)}`)
              : isWidthLessThan768px
              ? require(`../assets/category-${category}/tablet/image-${image(p.slug)}`)
              : require(`../assets/category-${category}/desktop/image-${image(p.slug)}`)
          }
          slug={p.slug}
        />
      );
    });
  };

  return (
    <div>
      <Header />
      <main id="category">
        <section className="category-header">
          <h2>{category}</h2>
        </section>
        <section className="products">
          <div className="container">{renderProducts()}</div>
        </section>
        <Categories />
        <BestGear />
      </main>
      <Footer />
    </div>
  );
};

export default Category;

const Product = ({ description, image, name, slug, newItem }) => {
  return (
    <div className="product">
      <img src={image.default} alt={name} />
      <div className="text">
        {newItem && <div className="overline">NEW PRODUCT</div>}
        <h2 className="name">{name}</h2>
        <div className="description">{description}</div>
        <Link to={`/product/${slug}`} className="btn one">
          SEE PRODUCT
        </Link>
      </div>
    </div>
  );
};
