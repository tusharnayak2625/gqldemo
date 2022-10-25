import { useMutation } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { REGISTER_USER } from "../gql_operations/mutations";
import { actionCreators } from "../redux";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userReducer, shallowEqual);

  const [signup, { loading, error }] = useMutation(REGISTER_USER,{onCompleted(data) {
    localStorage.setItem("auth_token", data.user.token);
    dispatch(actionCreators.register({token: data.user.token,error: null}));

    toast.success("Registration Successful!", {
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
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const onChangeHandler = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  const onRegister = (e)=> {
    e.preventDefault();
    signup({
      variables: {
        newuser: userDetails,
      },
    });
  }

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  if (loading) {
    return <h1>Loading...</h1>
  }

  if (error) {
    dispatch(actionCreators.register({error: error.message}));
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
      <form onSubmit={onRegister}>
        <div>
          <label htmlFor="fname">First Name</label>
          <input
            type="text"
            name="firstName"
            id="fname"
            placeholder="First Name"
            value={userDetails.fname}
            onChange={onChangeHandler}
          />
        </div>

        <div>
          <label htmlFor="lname">Last Name</label>
          <input
            type="text"
            name="lastName"
            id="lname"
            placeholder="Last Name"
            value={userDetails.lname}
            onChange={onChangeHandler}
          />
        </div>

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

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
