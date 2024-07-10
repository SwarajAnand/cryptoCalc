import { useState, useEffect } from "react";
import Aflag from "../assets/AustraliaFlag.svg";
import Tick from "../assets/Tick.svg";
import PropTypes from "prop-types";

const MainCalci = ({ data }) => {
  const [index, setIndex] = useState(0);
  const [input, setInput] = useState({
    purchase: "",
    sale: "",
    expense: "",
  });
  const [capGain, setCapGain] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [netCapGain, setNetCapGain] = useState(0);
  const [tax, setTax] = useState(0);
  const [long, setLong] = useState(true);
  const [short, setShort] = useState(false);

  const handleShortTerm = () => {
    setShort(true);
    setLong(false);
    setDiscount(0);
  };

  const handleLongTerm = () => {
    setShort(false);
    setLong(true);
  };

  useEffect(() => {
    const purchase = parseFloat(input.purchase) || 0;
    const sale = parseFloat(input.sale) || 0;
    const expense = parseFloat(input.expense) || 0;

    // Calculate capital gains amount
    const capGains = sale - purchase - expense;
    setCapGain(capGains);

    // Calculate discount for long-term gains
    let discount = 0;
    if (long && capGains > 0) {
      discount = 0.5 * capGains;
    }
    setDiscount(discount);

    const netGains = long ? capGains - discount : capGain;
    setNetCapGain(netGains);

    let taxVal = long
      ? (discount * data[index].val) / 100
      : (netCapGain * data[index].val) / 100;
    setTax(taxVal);
  }, [input, long, short, index, netCapGain]);

  const handleInputChange = (field) => (e) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
      setInput({ ...input, [field]: value });
    }
  };

  return (
    <div className="bg-white p-4 m-4 border md:m-8 rounded-md">
      <h1 className="text-2xl md:text-3xl font-semibold text-center p-2 mb-3">
        Free Crypto Tax Calculator Australia
      </h1>
      <div>
        <div>
          <label htmlFor="financialYear">Financial Year</label>
          <select
            name="financialYear"
            defaultValue="FY-2023-24"
            className="bg-[#EFF2F5]"
          >
            <option>FY-2023-24</option>
          </select>
        </div>

        <div>
          <label htmlFor="country">Country</label>
          <select
            name="country"
            defaultValue="Australia"
            className="bg-[#EFF2F5]"
          >
            <option>
              <div>
                <img src={Aflag} alt="Australia Flag" />
                Australia
              </div>
            </option>
          </select>
        </div>

        {/* enter purchase and sales cols */}
        <div className="md:flex justify-around">
          <div>
            <label>Enter purchase price of Crypto</label>
            <div className="bg-[#EFF2F5] py-3 px-2 rounded-md md:min-w-[335px] ">
              <span>$</span>
              <input
                className="bg-[#EFF2F5] outline-none"
                type="text"
                value={input.purchase}
                onChange={handleInputChange("purchase")}
              />
            </div>
          </div>
          <div>
            <label>Enter sale price of Crypto</label>
            <div className="bg-[#EFF2F5] py-3 px-2 rounded-md md:min-w-[335px] ">
              <span>$</span>
              <input
                className="bg-[#EFF2F5] outline-none"
                type="text"
                value={input.sale}
                onChange={handleInputChange("sale")}
              />
            </div>
          </div>
        </div>

        <div className="md:flex justify-around mt-4">
          <div>
            <label>Enter your Expenses</label>
            <div className="bg-[#EFF2F5] py-3 px-2 rounded-md md:min-w-[335px] ">
              <span>$</span>
              <input
                className="bg-[#EFF2F5] outline-none"
                type="text"
                value={input.expense}
                onChange={handleInputChange("expense")}
              />
            </div>
          </div>

          <div className="md:min-w-[340px] my-4 md:my-0">
            <h1>Investment Type</h1>
            <div className="w-full">
              {/* investment types */}

              <div className="flex justify-between">
                <div
                  onClick={handleShortTerm}
                  className="cursor-pointer md:min-w-[150px]"
                >
                  <div
                    className={`flex items-center border border-black py-3 px-2 rounded-md ${
                      short
                        ? "bg-[#0052FE0F] border-2 border-[#0052FE]"
                        : "bg-white"
                    }`}
                  >
                    <p>Short Term </p>
                    <div className="ml-2">
                      {short && <img className="h-[16px]" src={Tick} />}
                    </div>
                  </div>
                  <p className="text-xs font-semibold">{"< 12 months"}</p>
                </div>
                <div
                  onClick={handleLongTerm}
                  className="cursor-pointer md:min-w-[150px]"
                >
                  <div
                    className={`flex items-center border border-black py-3 px-2 rounded-md ${
                      long
                        ? "bg-[#0052FE0F] border-2 border-[#0052FE]"
                        : "bg-white"
                    }`}
                  >
                    <p>Long Term </p>
                    <div className="ml-2">
                      {long && <img className="h-[16px]" src={Tick} />}
                    </div>
                  </div>
                  <p className="text-xs font-semibold">{"> 12 months"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/**/}


          {/* <p>Select Your Annual Income</p> */}
          <div className="md:flex justify-around items-center">
            <div>
            <p>Select Your Annual Income</p>
              <select
                onChange={(e) => setIndex(e.target.selectedIndex)}
                className="bg-[#EFF2F5] outline-none w-full rounded-md md:md:min-w-[335px]   py-3 px-2"
              >
                {data.map((ele, idx) => (
                  <option
                    className="bg-[#EFF2F5] outline-none rounded-md md:min-w-[335px]   py-3 px-2"
                    key={idx}
                  >
                    {ele.income}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <p className="text-[#3E424A] md:min-w-[335px] ">Tax Rate</p>
              <p>{data[index].tax}</p>
            </div>
          </div>


        {long && (
          <div className="md:flex justify-around mt-4">
            <div>
              <label>Capital gains amount</label>
              <div className="bg-[#EFF2F5] py-3 px-2 rounded-md md:min-w-[335px] ">
                <span>$ {capGain}</span>
              </div>
            </div>
            <div>
              <label>Discount for long term gains</label>
              <div className="bg-[#EFF2F5] py-3 px-2 rounded-md md:min-w-[335px] ">
                <span>$ {discount}</span>
              </div>
            </div>
          </div>
        )}

        <div className="md:flex justify-around mt-4 ">
          <div className="h-[97px] text-center flex flex-col justify-center rounded-md md:w-[335px] w-[85%] m-auto md:m-0 mb-3 bg-[#EBF9F4]">
            <h1>Net Capital gains tax amount</h1>
            <p className="text-[#0FBA83] text-xl font-bold">$ {netCapGain}</p>
          </div>

          <div className="bg-[#EBF2FF] h-[97px] text-center flex flex-col justify-center rounded-md md:w-[335px] w-[85%] m-auto md:m-0 mb-3">
            <h1>The tax you need to pay</h1>
            <p className="text-[#0141CF] font-bold text-xl">$ {tax}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

MainCalci.propTypes = {
  data: PropTypes.array.isRequired,
};

export default MainCalci;
