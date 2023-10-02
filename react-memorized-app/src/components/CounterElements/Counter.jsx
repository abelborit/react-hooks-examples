import { useCountWithHistory } from "../../hooks/useCountWithHistory";

export const Counter = () => {
  const { countState, historyState, increment, undo } = useCountWithHistory(0);

  return (
    <div>
      <h2>Count Element: {countState}</h2>

      <button onClick={increment}>Incrementar</button>
      {historyState.length > 0 && <button onClick={undo}>Deshacer</button>}
    </div>
  );
};
