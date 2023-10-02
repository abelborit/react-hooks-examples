import { useState } from "react";

export const CounterApp = () => {
  const [counterState, setCounterState] = useState(0);

  const handleIncrease = () => {
    /* aquí seguirá siendo 0 + 1 las dos veces porque el setCounterState no es del todo síncrona, es decir, la función de la siguiente línea no será lo suficientemente rápida para que la función setCounterState ya haya terminado de actualizar el estado (recordar que la velocidad de React es bien rápida pero en este caso no será lo suficientemente rápida para poder actualizar de esta forma el estado) asi coloque 10 veces la misma línea de código seguirá siendo 0 + 1 */
    // setCounterState(counterState + 1);
    // setCounterState(counterState + 1);

    /* actualizar el estado de esta forma buscará la última actualización en cola y de ahí utilizará ese valor para sumarle +1 */
    setCounterState((prevState) => prevState + 1);
  };

  return (
    <div>
      <h1>Clicks: {counterState}</h1>
      <button onClick={handleIncrease}>Increment</button>
    </div>
  );
};
