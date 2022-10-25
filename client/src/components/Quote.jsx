import React from "react";

const Quote = ({ quote }) => {
  return (
    <div className="w-[40%] p-4 mb-4 flex flex-wrap justify-between bg-quote-bg rounded-md">
      <h5 className="break-all">{quote.name}</h5>
      <p>~{quote.user.firstName}</p>
    </div>
  );
};

export default Quote;
