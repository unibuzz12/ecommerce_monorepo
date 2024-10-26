import { Order } from '@/types/order';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface OrderState {
  orders: Order[];
  loading: boolean;
  error: string;
}

const initialState: OrderState = {
  orders: [],
  loading: false,
  error: '',
};

// Fetch orders
export const fetchOrders = createAsyncThunk('orders/fetchOrders', async () => {
  const response = await axios.get<Order[]>('http://localhost:4000/api/order'); // Replace with your API route
  return response.data;
});


const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
       // Handle fetchOrders
       .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrders.fulfilled, (state, action: PayloadAction<Order[]>) => {
        state.orders = action.payload;
        state.loading = false;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch Orders';
      });
  },
});

export default orderSlice.reducer;
