import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { GET_ALL_QUOTES } from "../gql_operations/queries";
import { actionCreators } from "../redux";
import Quote from "../components/Quote";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userReducer, shallowEqual);
  const { quotes } = useSelector((state) => state.quoteReducer, shallowEqual);

  const { loading, error, data } = useQuery(GET_ALL_QUOTES, {
    onCompleted(data) {
      localStorage.setItem("all_quotes", JSON.stringify(data.quotes));
    },
  });

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      if (data) {
        dispatch(
          actionCreators.getAllQuotes({ quotes: data.quotes, error: null })
        );
      }
    }
  }, [user, data, navigate, dispatch]);

  if (error) {
    dispatch(actionCreators.getAllQuotes({ error: error.message }));
  }

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="min-h-[90vh] py-4 w-full flex flex-col items-center">
      {quotes?.length > 0 ? (
        quotes?.map((quote) => {
          return <Quote key={quote.name} quote={quote} />;
        })
      ) : (
        <h1>No Quotes!</h1>
      )}
    </div>
  );
};

export default Home;
