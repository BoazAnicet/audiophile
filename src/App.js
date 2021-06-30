import "./styles/styles.scss";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Switch } from "react-router";
import ScrollToTop from "./utils/ScrollToTop";
import Home from "./pages/Home";
import Category from "./pages/Category";
import Product from "./pages/Product";
import Checkout from "./pages/Checkout";

function App() {
  return (
    <div className="App">
      <Router>
        <ScrollToTop>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/category/:category" component={Category} />
            <Route exact path="/product/:slug" component={Product} />
            <Route exact path="/checkout" component={Checkout} />
          </Switch>
        </ScrollToTop>
      </Router>
    </div>
  );
}

export default App;
