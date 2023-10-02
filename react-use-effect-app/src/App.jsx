import { LifeCycle } from "./components/LifeCycle";
import { FetchCard } from "./components/FetchCard";
import { ResizeApp } from "./components/ResizeApp";
import "./App.css";

function App() {
  return (
    <>
      <LifeCycle />
      <hr />
      <FetchCard />
      <hr />
      <ResizeApp />
    </>
  );
}

export default App;
