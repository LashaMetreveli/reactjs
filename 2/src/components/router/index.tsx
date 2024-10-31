import { Route, Routes } from "react-router-dom";
import Products from "../products";
import ProductDetails from "../productDetails";

const RouterComponent = () => {
  return (
    <div className="main">
      <Routes>
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} />
      </Routes>
    </div>
  );
};

export default RouterComponent;
