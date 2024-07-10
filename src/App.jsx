import MainCalci from "./components/MainCalci";

const data = [
  {
    income: "$0 - $18,200",
    tax: "0%",
    val: 0,
  },
  {
    income: "$18,201 - $45,000",
    tax: "Nil + 19% of excess over $18,200",
    val: 19,
  },
  {
    income: "$45,001 - $120,000",
    tax: "$ 5,092 + 32.5% of excess over $45,000",
    val: 32.5,
  },
  {
    income: "$120,001 - $180,000",
    tax: "$ 29,467 + 37% of excess over $120,000",
    val: 37,
  },
  {
    income: "%180,000+",
    tax: "$ 51,667 + 45% of excess over $180,000",
    val: 45,
  },
];

function App() {
  return (
    <div>
      <MainCalci data={data} />
    </div>
  );
}

export default App;
