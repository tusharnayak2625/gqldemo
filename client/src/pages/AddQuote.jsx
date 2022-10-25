import React, { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { ADD_QUOTE } from "../gql_operations/mutations";
import { GET_ALL_QUOTES } from "../gql_operations/queries";
import { actionCreators } from "../redux";

const AddQuote = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userReducer, shallowEqual);
  const [addquote, { loading, error }] = useMutation(ADD_QUOTE, {
    refetchQueries: [{ query: GET_ALL_QUOTES }, "getAllQuotes"],
    onCompleted(data) {
      localStorage.setItem("all_quotes", JSON.stringify(data.quotes));
      dispatch(actionCreators.addQuote({ quotes: data.quotes }));
      navigate("/");
    },
  });
  const [name, setName] = useState("");

  const onChangeHandler = (e) => {
    e.preventDefault();
    setName(e.target.value);
  };

  const onQuoteAdd = (e) => {
    e.preventDefault();
    addquote({
      variables: {
        quote: { name },
      },
    });
    setName("");
  };

  useEffect(() => {
    if (!user) {
      navigate("/login", { replace: true });
    }
  }, [user, navigate]);

  if (error) {
    dispatch(actionCreators.addQuote({ error: error }));
  }

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="min-h-[90vh] w-full p-4 flex flex-col items-center justify-start">
      <h1 className="text-2xl">Add Quote</h1>
      <form onSubmit={onQuoteAdd} className="h-[10vh] w-[30%] my-2 flex justify-around items-center">
        <input
          type="text"
          placeholder="Quote"
          value={name}
          onChange={onChangeHandler}
          className="py-2 px-3 border-2 border-gray-400 rounded-sm"
        />
        <button
          type="submit"
          className="w-[20%] py-2 border-2 border-green-600 rounded-sm text-base text-white bg-green-600 hover:text-green-600 hover:bg-white transition-all"
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default AddQuote;
