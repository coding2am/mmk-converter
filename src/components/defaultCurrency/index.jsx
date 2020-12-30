import React from "react";
import "./index.css";

const DefaultCurrency = ({ amount, onChangeAmount, fromAmount, fromUnit }) => {
  return (
    <>
      <div>
        <input type="number" value={amount} onChange={onChangeAmount} />
        <span className="unit">MMK</span>
        <div className="text">
          <span>
            {fromAmount == "" ? "0" : fromAmount} {fromUnit} is equal to{" "}
            {isNaN(amount) ? "....." : amount.toFixed(2)} MMK
          </span>
        </div>
      </div>
    </>
  );
};
export default DefaultCurrency;
