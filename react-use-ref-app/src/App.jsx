import { FocusApp } from "./components/FocusApp";
import { CopyApp } from "./components/CopyApp";
import { MediaPlayerApp } from "./components/MediaPlayerApp";
import { ScrollAnimationApp } from "./components/ScrollAnimationApp";
import { RenderApp } from "./components/RenderApp";
import { LoadingApp } from "./components/LoadingApp";
import { CounterTimeInterval } from "./components/CounterTimeInterval";
import { NoteApp } from "./components/NoteApp";
import "./App.css";

function App() {
  return (
    <>
      {/* Interacción con el DOM */}
      <FocusApp />
      <hr />
      <CopyApp />
      <hr />
      <MediaPlayerApp />
      <hr />
      <ScrollAnimationApp />

      {/* Referencias mutables */}
      <RenderApp />
      <hr />
      <LoadingApp />
      <hr />
      <CounterTimeInterval />
      <hr />
      <NoteApp />
    </>
  );
}

export default App;
