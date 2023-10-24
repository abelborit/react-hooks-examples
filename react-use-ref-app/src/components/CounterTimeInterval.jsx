import { useEffect, useRef, useState } from "react";

export const CounterTimeInterval = () => {
  const [counter, setCounter] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  /* se creó una referencia para guardar el tiempo con el que se aumentará el contador la cual no se perderá cada que se renderice el componente */
  const timer = useRef(0);

  useEffect(() => {
    if (isRunning) {
      timer.current = setInterval(() => {
        setCounter((prevState) => prevState + 1);
      }, 1000);
    }
  }, [isRunning]);

  const handleRun = () => {
    setIsRunning(true);
  };

  const handleStop = () => {
    /* como no se pierde el valor que tiene la referencia en cada renderizado entonces se puede utilizar con tranquilidad */
    clearInterval(timer.current);
    timer.current = 0;
    setIsRunning(false);
  };

  return (
    <div>
      <h1>Counter Time Interval</h1>

      <h3>Counter: {counter}</h3>

      <button onClick={handleRun}>Run</button>
      <button onClick={handleStop}>Stop</button>
    </div>
  );
};
