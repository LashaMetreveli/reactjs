import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, setFilter } from "../../store/slices/product.slice";
import { AppDispatch, RootState } from "../../store/store";
import Card from "../card";
import "./Products.css";
import { Link } from "react-router-dom";

const Products: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { filteredList, state, error, filter } = useSelector(
    (state: RootState) => state.product
  );

  useEffect(() => {
    if (state === "INITIAL") {
      dispatch(fetchProducts());
    }
  }, [dispatch, state]);

  useEffect(() => {
    if (filter) {
      dispatch(setFilter(filter)); // Dispatch the filter action
    }
  }, [filter, dispatch]);

  if (state === "LOADING") {
    return <div>LOADING...</div>;
  }

  if (state === "ERROR") {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Search products..."
        value={filter}
        onChange={(e) => dispatch(setFilter(e.target.value))}
        style={{ padding: "10px", margin: "20px", width: "calc(100% - 60px)" }}
      />
      <div className="products-container">
        {filteredList.map((product: any) => (
          <Link
            key={product.id}
            to={`/products/${product.id}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <Card
              key={product.id}
              id={product.id}
              title={product.title}
              price={product.price}
              category={product.category}
              thumbnail={product.thumbnail}
              description={product.description}
            />{" "}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Products;
