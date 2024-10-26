import { Product } from "@/types/product";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

interface ProductState {
  products: Product[];
  loading: boolean;
  error: string;
}

const initialState: ProductState = {
  products: [],
  loading: false,
  error: "",
};

// Async thunk for creating a product
export const createProduct = createAsyncThunk(
  "products/createProduct",
  async (product: Product, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/products",
        product
      ); // Update URL as needed
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Fetch products
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await axios.get<Product[]>(
      "http://localhost:4000/api/products"
    ); // Replace with your API route
    return response.data;
  }
);

// Update product
export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async (
    { id, data }: { id: string; data: Partial<Product> },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.put(
        `http://localhost:4000/api/products/${id}`,
        data
      ); // Replace with your API route
      toast.success("Updated successfully");
      return response.data;
    } catch (error: any) {
      // You can customize this error handling as needed
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  }
);

// Delete product
export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id: string, { rejectWithValue }) => {
    try {
      await axios.delete(`http://localhost:4000/api/products/${id}`); // Replace with your API route
      toast.success("Deleted successfully");
      return id; // Return the product ID on successful deletion
    } catch (error: any) {
      // Handle different error scenarios
      toast.error("Deleted failed");
      return rejectWithValue(error.response.data); // Return server error response
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        createProduct.fulfilled,
        (state, action: PayloadAction<Product>) => {
          state.products.push(action.payload);
          state.loading = false;
        }
      )
      .addCase(createProduct.rejected, (state) => {
        state.loading = false;
      })
      // Handle fetchProducts
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchProducts.fulfilled,
        (state, action: PayloadAction<Product[]>) => {
          state.products = action.payload;
          state.loading = false;
        }
      )
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch products";
      })

      // Handle updateProduct
      .addCase(
        updateProduct.fulfilled,
        (state, action: PayloadAction<Product>) => {
          const index = state.products.findIndex(
            (product) => product.id === action.payload.id
          );
          if (index !== -1) {
            state.products[index] = action.payload;
            state.products = [...state.products];
          }
        }
      )

      // Handle deleteProduct
      .addCase(
        deleteProduct.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.products = state.products.filter(
            (product) => product.id !== action.payload
          );
        }
      );
  },
});

export default productSlice.reducer;
