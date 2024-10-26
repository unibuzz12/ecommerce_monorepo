import React from "react";
import OrderTable from "./OrderTable";

const OrderContent = () => {
  return (
    <>
      <main>
        <div className="head-title">
          <div className="left">
            <h1>Orders</h1>
          </div>
        </div>
        <OrderTable />
      </main>
    </>
  );
};

export default OrderContent;
