import React from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { actionCreators } from "../redux";

import styles from "./navbar.module.css";

const Navbar = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userReducer, shallowEqual);

  const onLogout = (e) => {
    e.preventDefault();
    dispatch(actionCreators.logout());
  };

  return (
    <div className={styles.navbar}>
      <div className={styles.logoDiv}>
        <h2 className="text-2xl">Quotify</h2>
      </div>

      <div className={styles.menuDiv}>
        {user ? (
          <>
            <Link to="/">Home</Link>
            <Link to="/profile">Profile</Link>
            <Link to="/addquote">+</Link>
            <h3 onClick={onLogout}>Logout</h3>
          </>
        ) : (
          <>
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
