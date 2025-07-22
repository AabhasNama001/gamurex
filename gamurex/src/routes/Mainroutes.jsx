import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import Products from "../pages/Products";
import PageNotFound from "../pages/PageNotFound";
import ProductDetails from "../pages/ProductDetails";
import Favourites from "../pages/Favourites";

const Mainroutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/products" element={<Products />} />
      <Route path="/product-details" element={<ProductDetails />} />
      <Route path="/fav" element={<Favourites />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default Mainroutes;
