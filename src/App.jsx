import React from "react";
import Footer from "./components/Layout/Footer";
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
      <Footer />
    </CartContextProvider>
  );
}

export default App;