import { useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { GET_PROFILE } from "../gql_operations/queries";
import { actionCreators } from "../redux";
import dp from "../images/dp.webp";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, profile } = useSelector(
    (state) => state.userReducer,
    shallowEqual
  );

  const { loading, error, data } = useQuery(GET_PROFILE, {
    onCompleted(data) {
      localStorage.setItem("user_profile", JSON.stringify(data.profile));
    },
  });

  useEffect(() => {
    if (!user) {
      navigate("/login", { replace: true });
    } else {
      if (data) {
        dispatch(
          actionCreators.profile({ profile: data.profile, error: null })
        );
      }
    }
  }, [user, data, navigate, dispatch]);

  if (error) {
    dispatch(actionCreators.profile({ error: error.message }));
  }

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="min-h-[90vh] w-full p-4 flex flex-col items-center">
      <h1 className="text-3xl text-black font-bold">
        {profile?.firstName} {profile?.lastName}
      </h1>
      <h2 className="mt-4 text-xl text-black">{profile?.email}</h2>
      <img
        src={dp}
        alt="User Profile"
        className="h-[15rem] w-[15rem] my-4 rounded-[50%]"
      />

      <h1 className="my-4 text-black text-2xl">My Quotes</h1>
      <div className="w-[30%]">
        {profile?.quotes.length > 0 ? (
          profile?.quotes.map((quote,index) => {
            return (
              <div key={index} className="w-[100%] p-4 mb-4 flex flex-wrap justify-between bg-quote-bg rounded-md">
                <h5 className="break-all">{quote.name}</h5>
                <p>~{profile?.firstName}</p>
              </div>
            );
          })
        ) : (
          <h3>No Quotes</h3>
        )}
      </div>
    </div>
  );
};

export default Profile;
