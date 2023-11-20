import { LifeCycle } from "./components/LifeCycle";
import { FetchCard } from "./components/FetchCard";
import { ResizeApp } from "./components/ResizeApp";
import { CallOneTimeEffect } from "./components/CallOneTimeEffect";
import { UserPage } from "./components/UserPage";
import "./App.css";

function App() {
  return (
    <>
      <LifeCycle />
      <hr />
      <FetchCard />
      <hr />
      <ResizeApp />
      <hr />
      <CallOneTimeEffect />
      <hr />
      <UserPage />
    </>
  );
}

export default App;
