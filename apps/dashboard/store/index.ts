import { configureStore } from '@reduxjs/toolkit';
import productReducer from './productSlice';
import orderReducer from './orderSlice';

const store = configureStore({
  reducer: {
    product: productReducer,
    order: orderReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
