import React from "react";
import { Link } from "react-router-dom";

const Quote = ({ quote }) => {
  return (
    <div className="w-[40%] p-4 mb-4 flex flex-wrap justify-between bg-quote-bg rounded-md">
      <h5 className="break-all">{quote.name}</h5>
      {/* <Link to={`/users/${quote.user._id}`}><p>~{quote.user.firstName}</p></Link> */}
      <p>~{quote.user.firstName}</p>
    </div>
  );
};

export default Quote;
