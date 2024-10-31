import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductById } from "../../store/slices/product.slice";
import { AppDispatch, RootState } from "../../store/store";
import "./ProductDetails.css";

const ProductDetails: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { productDetails, error } = useSelector(
    (state: RootState) => state.product
  );

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const productId = Number(window.location.pathname.split("/").pop());

  useEffect(() => {
    const loadProduct = async () => {
      setIsLoading(true);
      await dispatch(fetchProductById(productId));
      setIsLoading(false);
    };

    loadProduct();
  }, [dispatch, productId]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="product-details">
      <h1>{productDetails?.title}</h1>
      <img src={productDetails?.thumbnail} alt={productDetails?.title} />
      <p className="price">Price: ${productDetails?.price}</p>
      <p>Description: {productDetails?.description}</p>
      <p className="category">Category: {productDetails?.category}</p>
    </div>
  );
};

export default ProductDetails;
