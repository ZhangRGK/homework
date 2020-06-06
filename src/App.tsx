import React, { useState } from "react";
import "./App.css";
import BillList from "./pages/BillList";
import { DataContext } from "./dataContext";
import { IBill, ICategory } from "./constants";

function App() {
  const [bills, setBills] = useState<IBill[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);

  const value = {
    bills,
    setBills,
    categories,
    setCategories,
  };

  return (
    <DataContext.Provider value={value}>
      <div className="app">
        <BillList />
      </div>
    </DataContext.Provider>
  );
}

export default App;
