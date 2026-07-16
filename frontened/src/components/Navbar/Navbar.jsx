import React, { useContext, useState ,useRef} from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { Link as ScrollLink } from "react-scroll";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";

const Navbar = ({ setshowLogin }) => {
  const [menu, setmenu] = useState("home");
  const [showDropdown, setShowDropdown] = useState(false);
  const inputRef = useRef(null);

  // Search states
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  const navigate = useNavigate();

  const {
    getTotalCartAmount,
    token,
    setToken,
    food_list,
    url,
    searchText,
  setSearchText,
  } = useContext(StoreContext);

  
  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setShowDropdown(false);
    navigate("/");
  };

  // Search Function
  const handleSearch = (value) => {
    setSearch(value);

    if (value.trim() === "") {
      setSearchResult([]);
      return;
    }

    const result = food_list.filter(
      (item) =>
        item.name.toLowerCase().includes(value.toLowerCase()) ||
        item.category.toLowerCase().includes(value.toLowerCase())
    );

    setSearchResult(result);
  };

  return (
    <div className="navbar">
      <RouterLink to="/">
        <img src={assets.logo1} alt="Logo" className="logo" />
      </RouterLink>

      <ul className="navbar-menu">
        <RouterLink
        to="/"
        className={menu === "home" ? "active" : ""}
        onClick={() => setmenu("home")}
>
        Home
        </RouterLink>

        <ScrollLink
          to="explore-menu"
          smooth={true}
          duration={400}
          onClick={() => setmenu("menu")}
          className={menu === "menu" ? "active" : ""}
        >
          Menu
        </ScrollLink>

        <ScrollLink
          to="app-download"
          smooth={true}
          duration={400}
          onClick={() => setmenu("mobile-app")}
          className={menu === "mobile-app" ? "active" : ""}
        >
          Mobile App
        </ScrollLink>

        <ScrollLink
          to="footer"
          smooth={true}
          duration={400}
          onClick={() => setmenu("contact")}
          className={menu === "contact" ? "active" : ""}
        >
          Contact Us
        </ScrollLink>
      </ul>

      <div className="navbar-right">

        {/* Search Box */}
        <div className="search-box">
  <div className="search-input">
    <img
  src={assets.search_icon}
  alt="Search"
  className="search-icon"
  onClick={() => inputRef.current.focus()}
/>

   <input
  ref={inputRef}
  type="text"
  placeholder="Search food..."
  value={search}
  onChange={(e) => {
    handleSearch(e.target.value);
    setSearchText(e.target.value);
  }}
/>

  </div>

  {searchResult.length > 0 && (
    <div className="search-result">
      {searchResult.map((item) => (
        <div
          key={item._id}
          className="search-item"
          onClick={() => {
            setSearch(item.name);
            setSearchText(item.name);
            setSearchResult([]);
          }}
        >
          <img
            src={`${url}/images/${item.image}`}
            alt={item.name}
            className="search-food-img"
          />

          <div className="search-info">
            <h4>{item.name}</h4>
            <span>{item.category}</span>
            <p>${item.price}</p>
          </div>
        </div>
      ))}
    </div>
  )}
</div>

        <div className="navbar-search-icon">
          <RouterLink to="/cart">
            <img src={assets.basket_icon} alt="Basket" />
          </RouterLink>

          {getTotalCartAmount() > 0 && <div className="dot"></div>}
        </div>

        {!token ? (
          <button onClick={() => setshowLogin(true)}>
            Sign In
          </button>
        ) : (
          <div className="navbar-profile">
            <img
              src={assets.profile_icon}
              alt="Profile"
              onClick={() => setShowDropdown(!showDropdown)}
            />

            {showDropdown && (
              <ul className="nav-profile-dropdown">
                <li onClick={() => navigate("/myorders")}>
                  <img src={assets.basket_icon} alt="Orders" />
                  <p>Orders</p>
                </li>

                <hr />

                <li onClick={logout}>
                  <img src={assets.logout_icon} alt="Logout" />
                  <p>Logout</p>
                </li>
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;