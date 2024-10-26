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

// Async thunk for creating a order
export const createOrder = createAsyncThunk(
  "orders/createOrder",
  async (product_id: string, { rejectWithValue }) => {
    try {
      await axios.post("http://localhost:4000/api/order", {
        product_id,
      }); // Update URL as needed
      toast.success("Order Successfully")
      return product_id;
    } catch (error: any) {
      if (error.status === 402) {
        toast.error(error.response.data.message)
      }
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

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        createOrder.fulfilled,
        (state, action: PayloadAction<String>) => {
          state.products = [
            ...state.products.map((product) =>
              product.id === action.payload
                ? { ...product, inventory_count: product.inventory_count - 1 }
                : product
            ),
          ];
          state.loading = false;
        }
      )
      .addCase(createOrder.rejected, (state) => {
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
      });
  },
});

export default productSlice.reducer;
