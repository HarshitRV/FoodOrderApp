import React from "react";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import CartContextProvider from "./context/CartContextProvider";

const App = props => {
  return (
    <CartContextProvider>
      <Header />
      <main className="container">
        <Meals />
      </main>
    </CartContextProvider>
  );
}

export default App;