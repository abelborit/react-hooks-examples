import { useState } from "react";
import { Card } from "./Card";

export const LoadingApp = () => {
  const [showComponent, setShowComponent] = useState(false);

  /* si se presiona dos veces rápidamente (para montar y desmontar el componente) entonces en el componente Card no se podrá hacer el llamado a la API porque el componente ya estaría desmontado y por ende no se podría setear el estado de con setPost y setLoading y React nos da un warning en la consola */
  const handleShowComponent = () => {
    setShowComponent(!showComponent);
  };

  return (
    <div>
      <h1>Loading App</h1>

      <button onClick={handleShowComponent}>Show/Hide Component</button>
      {showComponent && <Card />}
    </div>
  );
};
