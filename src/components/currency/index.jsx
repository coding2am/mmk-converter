import React from "react";
import "./index.css";

const Currency = ({
  currencyUnits,
  unit,
  amount,
  onChangeAmount,
  onChangeUnit,
}) => {
  return (
    <>
      <input type="number" value={amount} onChange={onChangeAmount} />
      <select value={unit} onChange={onChangeUnit}>
        {currencyUnits.map((unit) => (
          <option value={unit} key={unit}>
            {unit}
          </option>
        ))}
      </select>
    </>
  );
};
export default Currency;
