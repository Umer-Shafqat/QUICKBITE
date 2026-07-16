import React, { useEffect, useState } from "react";
import "./Orders.css";
import { toast } from "react-toastify";
import axios from "axios";
import { assets } from "../../assets/assets";

function Orders({ url }) {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    const response = await axios.get(url + "/api/order/list");

    if (response.data.success) {
      setOrders(response.data.data);
      console.log(response.data.data);
    } else {
      toast.error("Error");
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  const statusHandler = async (event, orderId) => {
  const response = await axios.post(url + "/api/order/status", {
    orderId,
    status: event.target.value,
  });

  if (response.data.success) {
    fetchAllOrders();
  } else {
    toast.error("Status update failed");
  }
};

  return (
    <div className="order add">
      <h3>Order Page</h3>

      <div className="order-list">
        {orders.map((order, index) => {
          return (
            <div key={index} className="order-item">
              <img src={assets.parcel_icon} alt="" />

              <div>
                <p className="order-item-food">
                  <b>Items:</b>{" "}
                  {order.items.map((item, index) => {
                    if (index === order.items.length - 1) {
                      return item.name + " x " + item.quantity;
                    } else {
                      return item.name + " x " + item.quantity + ", ";
                    }
                  })}
                </p>

                <p className="order-item-name">
                  <b>Customer Name:</b> {order.address.firstName}{" "}
                  {order.address.lastName}
                </p>

                <p>
                  <b>Email:</b> {order.address.email}
                </p>

                <div className="order-item-address">
                  <p>
                    <b>Address:</b> {order.address.address}
                  </p>

                  <p>
                    <b>City:</b> {order.address.city}
                  </p>

                  <p>
                    <b>State:</b> {order.address.state}
                  </p>

                  <p>
                    <b>Country:</b> {order.address.country}
                  </p>

                  <p>
                    <b>Zip Code:</b> {order.address.zipcode}
                  </p>
                </div>

                <p>
                  <b>Phone:</b> {order.address.phone}
                </p>
              </div>

              <div>
                <p>
                  <b>Total Items:</b> {order.items.length}
                </p>

                <p>
                  <b>Amount:</b> ${order.amount}
                </p>

                <p>
                  <b>Status:</b>
                </p>

                <select
  onChange={(event) => statusHandler(event, order._id)}
  value={order.status}
>
                  <option value="Food Processing">
                    Food Processing
                  </option>
                  <option value="Out for delivery">
                    Out for delivery
                  </option>
                  <option value="Delivered">
                    Delivered
                  </option>
                </select>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Orders;