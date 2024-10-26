import React from "react";
import { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { FaFedora } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store";
import { fetchOrders } from "../../../store/orderSlice";
import { Order } from "@/types/order";
const OrderTable = () => {
  const dispatch = useDispatch<AppDispatch>();
  const orders = useSelector((state: RootState) => state.order);
  const [ordersToShow, setOrdersToShow] = useState<Order[]>([]);
  useEffect(() => {
    dispatch(fetchOrders());
  }, []);
  useEffect(() => {
    setOrdersToShow(orders.orders);
  }, [orders.orders]); // Run this effect whenever orders.orders changes

  return (
    <>
      <div className="table-data">
        <div className="order">
          <div className="head">
            <h3>Orders</h3>
            <i className="bx bx-search"></i>
            <i className="bx bx-filter"></i>
          </div>
          <table>
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Price</th>
                <th>Count</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {ordersToShow.map((order: Order) => (
                <tr key={order.id}>
                  <td>
                    <FaFedora className="user-avatar" />
                    <p>{order.name}</p>
                  </td>
                  <td>{order.price}</td>
                  <td>
                    <p>{order.count}</p>
                  </td>
                  <td>
                    <p>{order.created_date}</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default OrderTable;
