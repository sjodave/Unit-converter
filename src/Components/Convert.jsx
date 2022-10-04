import { useState } from "react";
import React from "react";
import convert from "convert-units";
export default function Convert() {
  const calculate = (value, from, to) => {
    let output = convert(value).from(from).to(to);
    return output;
  };
  const [inputValue, setInput] = useState(0);
  const [outputValue, setOutput] = useState(0);
  const [unitA, setUnitA] = useState("mm");
  const [unitB, setUnitB] = useState("cm");
  const [property, setProperty] = useState("length");

  return (
    <form>
      <input
        className="ip ip-1"
        type={"number"}
        value={inputValue !== 0 ? inputValue : ""}
        onChange={(input) => {
          setOutput(calculate(input.target.value, unitA, unitB));

          setInput(input.target.value);
        }}
      ></input>
      <select
        className="ip ip-2"
        onChange={(input) => {
          setUnitA(input.target.value);
          if (outputValue !== 0) {
            setOutput(1);
            setInput(calculate(1, unitB, input.target.value));
          }
        }}
      >
        {convert()
          .possibilities(property)
          .map((e) => {
            return (
              <option key={e} value={e}>
                {e}
              </option>
            );
          })}
      </select>
      <br />
      <input
        className="ip ip-1"
        type={"number"}
        value={outputValue !== 0 ? outputValue : ""}
        onChange={(input) => {
          setOutput(input.target.value);
          setInput(calculate(input.target.value, unitB, unitA));
        }}
      ></input>
      <select
        className="ip ip-2"
        onChange={(input) => {
          setUnitB(input.target.value);
          setOutput(calculate(inputValue, unitA, input.target.value));
        }}
      >
        {convert()
          .possibilities(property)
          .map((e, count) => {
            return count > 0 ? (
              <option key={e} value={e}>
                {e}
              </option>
            ) : (
              count++
            );
          })}
      </select>
      <br />
      <div>
        <button
          className="ip ip-3"
          style={{ marginBottom: "2%" }}
          onClick={() => {
            window.location.reload();
          }}
        >
          clear
        </button>
        <select
          className="ip ip-3"
          onChange={(e) => {
            setProperty(e.target.value);
            setUnitA(convert().possibilities(e.target.value)[0]);
            setUnitB(convert().possibilities(e.target.value)[1]);
            setInput(0);
            setOutput(0);
          }}
        >
          {convert()
            .measures()
            .map((e) => {
              return (
                <option key={e} value={e}>
                  {e}
                </option>
              );
            })}
        </select>
      </div>
    </form>
  );
}
