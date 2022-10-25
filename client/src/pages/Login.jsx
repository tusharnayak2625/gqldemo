import { useMutation } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { LOGIN_USER } from "../gql_operations/mutations";
import { actionCreators } from "../redux";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userReducer, shallowEqual);
  const [loginUser, { loading, error }] = useMutation(LOGIN_USER,{onCompleted(data) {
    localStorage.setItem("auth_token", data.user.token);
    dispatch(actionCreators.login({token: data.user.token,error: null}));

    toast.success("Login Successful!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

    navigate("/");
  }});
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
  });

  const onChangeHandler = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  const onLogin = (e) => {
    e.preventDefault();
    loginUser({
      variables: {
        userLogin: userDetails,
      },
    });
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  if (loading) {
    return <h1>Loading...</h1>
  }

  if (error) {
    dispatch(actionCreators.login({error: error.message}));
    toast.error(error, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }

  return (
    <div>
      <form onSubmit={onLogin}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            value={userDetails.email}
            onChange={onChangeHandler}
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            value={userDetails.password}
            onChange={onChangeHandler}
          />
        </div>

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
