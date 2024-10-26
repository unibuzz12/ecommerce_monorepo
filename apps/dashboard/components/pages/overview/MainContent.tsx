//components/MainContent.js

import React from "react";
import OrderTable from "../orders/OrderTable";

const MainContent = () => {
  return (
    <main>
      <div className="head-title">
        <div className="left">
          <h1>Dashboard</h1>
          <ul className="breadcrumb">
            <li>
              <a href="#">Dashboard</a>
            </li>
            <li>
              <i className="bx bx-chevron-right"></i>
            </li>
            <li>
              <a className="active" href="#">
                Home
              </a>
            </li>
          </ul>
        </div>
        <a href="#" className="btn-download">
          <i className="bx bxs-cloud-download"></i>
          <span className="text">Download Report</span>
        </a>
      </div>

      <ul className="box-info">
        <li>
          <i className="bx bxs-cart"></i>
          <span className="text">
            <h3>298</h3>
            <p>New Orders</p>
          </span>
        </li>
        <li>
          <i className="bx bxs-user-check"></i>
          <span className="text">
            <h3>389</h3>
            <p>Customers</p>
          </span>
        </li>
        <li>
          <i className="bx bxs-dollar"></i>
          <span className="text">
            <h3>$43,570</h3>
            <p>Total Revenue</p>
          </span>
        </li>
      </ul>

      <OrderTable />
    </main>
  );
};

export default MainContent;
