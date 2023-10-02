import { CounterApp } from "./components/CounterApp";
import { ConditionalApp } from "./components/ConditionalApp";
import { ErrorApp } from "./components/ErrorApp";
import { ProductApp } from "./components/ProductApp";
import { ShoppingCart } from "./components/ShoppingCart";
import { HeavyInitialStateApp } from "./components/HeavyInitialStateApp";

import "./App.css";

function App() {
  return (
    <>
      <CounterApp />
      <hr />
      <ConditionalApp />
      <hr />
      <ErrorApp />
      <hr />
      <ProductApp />
      <hr />
      <ShoppingCart />
      <hr />
      <HeavyInitialStateApp />
    </>
  );
}

export default App;
