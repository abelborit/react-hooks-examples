import { useCallback, useState } from "react";

/* cuando se crean custom hooks es una buena práctica que las funciones que vamos a devolver las devolvamos memorizadas ya que no sabemos dónde se van a utilizar estas funciones en códigos futuros y por ejemplo si se quieren usar como dependencia en useEffect() en cada render estas funciones van a ir cambiando su referencia y por ende serán una nueva instancia en memoria de modo que React pensará que la dependencia ha cambiado y ejecutará el useEffect() */
export const useCountWithHistory = (initialCount = 0) => {
  const [countState, setCountState] = useState(initialCount);
  /* hacer un state para colocar el histórico de lo que íbamos haciendo para al momento de deshacer se vaya mostrando el state anterior sucesivamente */
  const [historyState, setHistoryState] = useState([]);
  // console.log({ countState, historyState });

  /* se coloca como dependencias el countState y el historyState en cada arreglo de dependencias del useCallback() respectivamente ya que como se está usando dentro de la función entonces React nos pide esas dependencias, pero darse cuenta que esto sucede ya que el countState y el historyState se están tomando desde el exterior, es decir, desde el contexto global de toda la función useCountWithHistory cosa que cuando cambien los estados entonces se volverán a crear las funciones increment y undo. Esto significa que se recrearán solo cuando cambien esas dependencias */
  const increment = useCallback(
    function () {
      console.log("increment render");

      setCountState((prevState) => prevState + 1);
      setHistoryState((prevHistory) => [...prevHistory, countState]);
    },
    [countState]
  );

  const undo = useCallback(
    function () {
      console.log("undo render");

      /* quedarnos con el último elemento del historyState */
      const lastCount = historyState[historyState.length - 1];
      setCountState(lastCount);

      /* eliminar el último elemento del historyState porque ya se hizo uso de este elemento */
      const newHistoryState = historyState.slice(0, historyState.length - 1);
      setHistoryState(newHistoryState);
    },
    [historyState]
  );

  return { countState, historyState, increment, undo };
};
