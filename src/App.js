import React, { useEffect, useState } from "react";
import "./App.css";
import Currency from "./components/currency/index";
import DefaultCurrency from "./components/defaultCurrency/index";
import Logo from "./components/logo/logo.svg";

/* API */
const API_URL =
  "https://cors-anywhere.herokuapp.com/https://forex.cbm.gov.mm/api/latest";

const App = (props) => {
  /* states */
  const [currencyUnits, setCurrencyUnit] = useState([]);
  const [fromCurrencyUnit, setFromCurrencyUnit] = useState();
  const [exchangeRate, setExchangeRate] = useState();
  const [amount, setAmount] = useState(1);
  const [fromCurrencyAmount, setFromCurrencyAmount] = useState(true);

  /* function start */
  const handleExchangeRate = (str) => {
    if (typeof str != "undefined") {
      if (str.includes(",")) {
        let result = parseFloat(str.replace(/,/g, ""));
        return result;
      } else {
        let result = parseFloat(str);
        return result;
      }
    } else {
      return;
    }
  };
  const handleFromAmountChange = (e) => {
    setAmount(e.target.value);
    setFromCurrencyAmount(true);
  };

  const handleToAmountChange = (e) => {
    setAmount(e.target.value);
    setFromCurrencyAmount(false);
  };

  /* function end */

  let toAmount, fromAmount;
  if (fromCurrencyAmount) {
    fromAmount = amount;
    toAmount = amount * handleExchangeRate(exchangeRate);
  } else {
    toAmount = amount;
    fromAmount = amount / handleExchangeRate(exchangeRate);
  }

  /* useEffect */
  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => {
        const baseCurrencyUnit = "MMK";
        const currencyUnits = Object.keys(data.rates);
        const firstCurrencyUnit = currencyUnits[0];
        setCurrencyUnit([baseCurrencyUnit, ...currencyUnits]);
        setFromCurrencyUnit(firstCurrencyUnit);
        setExchangeRate(data.rates[firstCurrencyUnit]);
      });
  }, []);

  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => {
        setExchangeRate(data.rates[fromCurrencyUnit]);
      });
  }, [fromCurrencyUnit]);

  /* return element */
  return (
    <>
      <div className="container">
        <div className="logoContainer">
          <img src={Logo} alt="logo" className="logo" />
        </div>
        <div className="sideContainer">
          <h1>MMK-Converter</h1>
          <Currency
            currencyUnits={currencyUnits}
            unit={fromCurrencyUnit}
            amount={fromAmount}
            onChangeAmount={handleFromAmountChange}
            onChangeUnit={(e) => setFromCurrencyUnit(e.target.value)}
          />
          <div>
            <span className="equal">=</span>
          </div>
          <DefaultCurrency
            amount={toAmount}
            onChangeAmount={handleToAmountChange}
            fromAmount={fromAmount}
            fromUnit={fromCurrencyUnit}
          />
        </div>
      </div>
    </>
  );
};

export default App;
