import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getProducts } from "../../services/product";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  thumbnail: string;
}

interface ProductState {
  list: Product[];
  filteredList: Product[];
  filter: string;
  state: "INITIAL" | "LOADING" | "SUCCESS" | "ERROR";
  error: string | null;
  productDetails: Product | null;
}

const initialState: ProductState = {
  list: [],
  filteredList: [],
  filter: "",
  state: "INITIAL",
  error: null,
  productDetails: null,
};

export const fetchProducts = createAsyncThunk<Product[], void>(
  "products/fetch",
  async () => {
    const response = await getProducts();
    return response;
  }
);

export const fetchProductById = createAsyncThunk<Product, number>(
  "products/fetchById",
  async (id) => {
    const response = await fetch(`https://dummyjson.com/products/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch product details");
    }
    const data = await response.json();
    return data;
  }
);

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<string>) => {
      state.filter = action.payload;
      state.filteredList = action.payload
        ? state.list.filter((product) =>
            product.title.toLowerCase().includes(action.payload.toLowerCase())
          )
        : state.list;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchProducts.fulfilled,
        (state, action: PayloadAction<Product[]>) => {
          state.state = "SUCCESS";
          state.list = action.payload;
          state.filteredList = action.payload;
          state.error = null;
        }
      )
      .addCase(fetchProducts.rejected, (state, action) => {
        state.state = "ERROR";
        state.list = [];
        state.filteredList = [];
        state.error = action.error.message || "Failed to fetch products";
      })
      .addCase(fetchProducts.pending, (state) => {
        state.state = "LOADING";
        state.list = [];
        state.filteredList = [];
        state.error = null;
      })
      .addCase(
        fetchProductById.fulfilled,
        (state, action: PayloadAction<Product>) => {
          state.productDetails = action.payload;
        }
      )
      .addCase(fetchProductById.rejected, (state, action) => {
        state.error = action.error.message || "Failed to fetch product details";
      });
  },
});

export const { setFilter } = productSlice.actions;

export default productSlice.reducer;
