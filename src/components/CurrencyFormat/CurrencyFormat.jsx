import React from "react";
import numeral from "numeral";

const CurrencyFormat = ({ amount = 0 }) => {
  const formattedAmount = numeral(Number(amount) || 0).format("$0,0.00");

  return <span>{formattedAmount}</span>;
};

export default CurrencyFormat;