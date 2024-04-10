import React, { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/freshcart-logo.svg";
import styleModule from "./navbar.module.css";
import { UserContext } from "../../Context/UserContext";
import {
  NumOfItems,
  WishListArray,
  useCustomQuery,
} from "../../QueryFunctions/useQueryFunctions";
const NavBar = () => {
  let { user, setIsUser, setOpen, login } = useContext(UserContext);
  let navigate = useNavigate();
  // Logout
  function logOut() {
    setIsUser(null);
    localStorage.removeItem("userToken");
    navigate("/login");
  }

  // get number of items
  let { data } = useCustomQuery("NumOfItems", NumOfItems);
  // wishList Array To get Data
  let { data: wishListData } = useCustomQuery("WishListArray", WishListArray);

  return (
    <>
      <nav
        className="navbar navbar-expand-lg navbar-light bg-light py-3 position-sticky top-0 w-100"
        style={{ zIndex: "99" }}
      >
        <div className="container">
          <Link to="/" className="navbar-brand">
            <img src={logo} alt="" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {/* user >> not null  */}
            {user ? (
              <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <NavLink to="/" className="nav-link">
                    Home
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink to="/products" className="nav-link">
                    Products
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/categories" className="nav-link">
                    Categories
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/brands" className="nav-link">
                    Brands
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/cart" className="nav-link">
                    Cart
                    {/* ({data?.data?.numOfCartItems}) */}
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/wishlist" className="nav-link">
                    WishList ({wishListData?.data?.data.length})
                  </NavLink>
                </li>
              </ul>
            ) : (
              ""
            )}

            <ul className="navbar-nav ms-auto  mb-2 mb-lg-0">
              {!user ? (
                <>
                  <li className="nav-item">
                    <NavLink to="/login" className="nav-link">
                      Login
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/register" className="nav-link">
                      Register
                    </NavLink>
                  </li>
                </>
              ) : (
                <li className="nav-item">
                  <span
                    onClick={() => {
                      logOut();
                    }}
                    className="nav-link cursor-pointer"
                  >
                    Logout
                  </span>
                </li>
              )}
              {/* Cart Icon */}
              {user ? (
                <li
                  className="nav-item"
                  onClick={() => {
                    setOpen(true);
                  }}
                >
                  <NavLink to="/cart" className="nav-link position-relative">
                    <i className="fa-solid fa-cart-shopping fs-5"></i>
                    <span
                      className={`${styleModule.cartItem} text-center d-flex justify-content-center align-items-center text-white position-absolute rounded-circle`}
                    >
                      {data?.data?.numOfCartItems}
                    </span>
                  </NavLink>
                </li>
              ) : (
                ""
              )}
              {user ? (
                <li className="nav-item">
                  <span className="nav-link ms-4 d-flex fw-bolder ">
                    <span>Hi :</span>
                    <span className="text-success mx-1 text-capitalize">
                      {" "}
                      {login}{" "}
                    </span>
                  </span>
                </li>
              ) : (
                ""
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
