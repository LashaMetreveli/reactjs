import { dummyApi } from "../api/dummy";

export const getProducts = async () => {
  try {
    const response = await dummyApi.get("/products");
    return response.data.products;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};
