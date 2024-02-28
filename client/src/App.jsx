import { useEffect, useState } from "react";
import "./App.css";
function App() {
  const [name, setName] = useState("");
  const [datetime, setDateTime] = useState("");
  const [description, setDescription] = useState("");
  const [transactions, setTransactions] = useState([]);
  useEffect(() => {
    getTransactions().then((transactions) => {
      setTransactions(transactions);
    });
  }, [transactions]);
  const getAmount = (str) => {
    let amount = 0;
    for (let i = 1; i < str.length; i++) 
      amount = amount * 10 + (str[i] - '0');
    if(str[0] == '-')
      return -1*amount;
    return amount;
  };
  const getTransactions = async () => {
    const url = "https://moneytraker-1.onrender.com/server/transactions";
    const res = await fetch(url);
    const data = await res.json();
    return data;
  };
  const addNewTransaction = (e) => {
    e.preventDefault();
    const url = "https://moneytraker-1.onrender.com/server/transaction";
    const amount = name.split(" ")[0];
    fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        amount,
        name: name.substring(amount.length + 1),
        description,
        datetime,
      }),
    }).then((response) => {
      response.json().then((json) => {
        setName("");
        setDateTime("");
        setDescription("");
        console.log(json);
      });
    });
  };
  let totalAmount=0;
  for(const transaction of transactions)
  {
    totalAmount+=getAmount(transaction.Amount);
  }
  return (
    <main>
      <h1>
        $ {totalAmount}<span>.00</span>
      </h1>
      <form onSubmit={addNewTransaction}>
        <div className="basic">
          <input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            placeholder="+200 Received from xyz"
          />
          <input
            type="datetime-local"
            value={datetime}
            onChange={(e) => {
              setDateTime(e.target.value);
            }}
          />
        </div>
        <div className="description">
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
        </div>
        <button type="submit">Add New Transaction</button>
        {/* {transactions.length} */}
      </form>
      <div className="transactions">
        {transactions.length > 0 &&
          transactions.map((transaction) => (
            <div className="transaction" key={transaction.id}>
              <div className="left">
                <div className="name">{transaction.Name}</div>
                <div className="description">{transaction.Description}</div>
              </div>
              <div className="right">
                <div className={"price "+(getAmount(transaction.Amount) < 0 ? "red":"green")}>
                  {transaction.Amount}
                </div>
                <div className="datetime">{transaction.Datetime}</div>
              </div>
            </div>
          ))}
      </div>
    </main>
  );
}
export default App;
