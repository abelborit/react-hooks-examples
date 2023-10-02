import { useState } from "react";

export const ErrorApp = () => {
  const [error, setError] = useState("");

  const handleError = (message) => {
    setError(message);
  };

  return (
    <div>
      {error ? <h1>Error: {error}</h1> : <h1>There are not errors</h1>}

      <button onClick={() => handleError("Error #1")}>Error Button #1</button>
      <button onClick={() => handleError("Error #2")}>Error Button #2</button>
      <button onClick={() => handleError("")}>Normal Button</button>
    </div>
  );
};
