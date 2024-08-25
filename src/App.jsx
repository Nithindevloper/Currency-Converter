import { useState } from "react";
import useCurrencyInfo from "./components/hooks/useCurrencyInfo";
import { InputBox } from "./components/index.js";
import "./App.css";

function App() {
  const [amount, setAmount] = useState();
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("inr");
  const [convertedAmount, setConvertedAmount] = useState();

  const currencyInfo = useCurrencyInfo(from);
  const options = Object.keys(currencyInfo);

  const swap = () => {
    setFrom(to);
    setTo(from);
    setConvertedAmount(amount);
    setAmount(convertedAmount);
  };

  const clearBtn = () => {
    setAmount(0);
  };

  const convert = () => {
    setConvertedAmount(amount * currencyInfo[to]);
  };
  return (
    <>
      <div className="bg-no-repeat w-full bg-cover h-screen flex justify-center items-center bg-[url(https://cdn.pixabay.com/photo/2023/06/04/17/08/finance-8040361_1280.jpg)]">
        <div className="w-full">
          <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm  bg-white/30">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                convert();
              }}
            >
              <div className="w-full mb-1">
                <InputBox
                  label="From"
                  amount={amount}
                  currencyOptions={options}
                  onCurrencyChange={(currency) => setFrom(currency)}
                  onAmountChange={(amount) => setAmount(amount)}
                  selectedCurrency={from}
                />
              </div>
              <div className="relative w-full h-0.5">
                <button
                  type="button"
                  className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-orange-400 px-2 py-0.5"
                  onClick={swap}
                >
                  Swap
                </button>
              </div>
              <div className="w-full mb-1">
                <InputBox
                  label="To"
                  amount={convertedAmount}
                  currencyOptions={options}
                  onCurrencyChange={(currency) => setTo(currency)}
                  selectedCurrency={to}
                  amountDisabled
                />
              </div>
              <button
                type="submit"
                className="w-full bg-orange-400 px-4 py-3 rounded-lg"
              >
                Covert {from.toUpperCase()} to {to.toUpperCase()}
              </button>
            </form>
            <button
              onClick={clearBtn}
              className="w-full bg-red-300 px-4 py-3 rounded-lg mt-2"
            >
              Clear
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
