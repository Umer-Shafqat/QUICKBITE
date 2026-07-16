import React, { useContext, useState } from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { toast } from "react-toastify";

const LoginPopup = ({ setshowLogin }) => {

  const { url, setToken } = useContext(StoreContext);

  const [currstate, setcurrstate] = useState("Login");

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;

    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onLogin = async (event) => {
    event.preventDefault();

    try {
      let newUrl = url;

      if (currstate === "Login") {
        newUrl += "/api/user/login";
      } else {
        newUrl += "/api/user/register";
      }

      const response = await axios.post(newUrl, data);

      if (response.data.success) {
        localStorage.setItem("token", response.data.token);

        if (setToken) {
          setToken(response.data.token);
        }

        toast.success(response.data.message);
        setshowLogin(false);
      } else {
        toast.error(response.data.message);
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <div className="login-popup">
      <form onSubmit={onLogin} className="login-popup-container">

        <div className="login-popup-title">
          <h2>{currstate}</h2>

          <img
            src={assets.cross_icon}
            alt=""
            onClick={() => setshowLogin(false)}
          />
        </div>

        <div className="login-popup-inputs">

          {currstate === "Sign Up" && (
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={data.name}
              onChange={onChangeHandler}
              required
            />
          )}

          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={data.email}
            onChange={onChangeHandler}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={data.password}
            onChange={onChangeHandler}
            required
          />

        </div>

        <button type='submit'>
          {currstate === "Sign Up" ? "Create Account" : "Login"}
        </button>

        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>I agree to the Terms of Service and Privacy Policy</p>
        </div>

        {currstate === "Login" ? (
          <p>
            Create a New Account?
            <span onClick={() => setcurrstate("Sign Up")}>
              {" "}Click Here
            </span>
          </p>
        ) : (
          <p>
            Already have an account?
            <span onClick={() => setcurrstate("Login")}>
              {" "}Login Here
            </span>
          </p>
        )}

      </form>
    </div>
  );
};

export default LoginPopup;