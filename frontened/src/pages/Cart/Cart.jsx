import React, { useContext } from "react";
import "./Cart.css";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import { toast } from "react-toastify";

const Cart = ({ setshowLogin }) => {

  const {
    cartitems,
    food_list,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
  } = useContext(StoreContext);

  const navigate = useNavigate();

  return (
    <div className="cart">

      <div className="cart-items">

        <div className="cart-items-title">
          <p>Item</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>

        <br />
        <hr />

        {food_list.map((item, index) => {
          if (cartitems[item._id] > 0) {
            return (
              <div key={index}>
                <div className="cart-items-title cart-items-item">

                  <img
                    src={url + "/images/" + item.image}
                    alt={item.name}
                  />

                  <p>{item.name}</p>

                  <p>${Number(item.price).toFixed(2)}</p>

                  <p>{cartitems[item._id]}</p>

                  <p>
                    $
                    {(item.price * cartitems[item._id]).toFixed(2)}
                  </p>

                  <p
                    className="cross"
                    onClick={() => removeFromCart(item._id)}
                  >
                    X
                  </p>

                </div>

                <hr />
              </div>
            );
          }

          return null;
        })}

      </div>

      <div className="cart-bottom">

        <div className="cart-total">

          <h2>Cart Totals</h2>

          <div>

            <div className="cart-total-details">
              <p>Sub Total</p>
              <p>${getTotalCartAmount().toFixed(2)}</p>
            </div>

            <hr className="hr" />

            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount() === 0 ? "0.00" : "2.00"}</p>
            </div>

            <hr className="hr" />

            <div className="cart-total-details">
              <b>Total</b>

              <b>
                $
                {getTotalCartAmount() === 0
                  ? "0.00"
                  : (getTotalCartAmount() + 2).toFixed(2)}
              </b>
            </div>

          </div>

          <button
            onClick={() => {

              if (!token) {
                toast.error("Please login first!");
                setshowLogin(true);
                return;
              }

              navigate("/order");

            }}
          >
            Proceed to Checkout
          </button>

        </div>

        <div className="cart-promocode">

          <div>

            <p>If you have a Promo Code, Enter it here</p>

            <div className="cart-promocode-input">

              <input
                type="text"
                placeholder="Enter your code"
              />

              <button>Apply</button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Cart;