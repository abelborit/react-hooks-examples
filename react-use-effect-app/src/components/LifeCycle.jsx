import { useEffect } from "react";
import { useState } from "react";

/* por más que aquí pareciera que solo se renderiza una vez y se piense que es el lugar correcto para colocar funciones que realicen cálculos pesados, esto en la realidad es un poco diferente ya que para este archivo como tal puede ayudar el colocar algunas cosas afuera del componente principal para evitar nuevas asignaciones en memoria innecesarias (objetos iniciales, algunas funciones que no tengan que ver con el estado del componente, etc.) pero al momento de importarlo en otro archivo, es decir, si este archivo LifeCycle.jsx está importado en App.jsx y así no se está usando entonces igual este "console.log("Pre-render");" se muestra en consola ya que basta su importación para mostrar lo que está afuera del componente y eso puede afectar el rendimiento */
console.log("Pre-render");

export const LifeCycle = () => {
  console.log("Logic render");
  const [counterState1, setCounterState1] = useState(0);
  const [counterState2, setCounterState2] = useState(0);

  const handleIncrease = (setStateFunction) => {
    setStateFunction((prevState) => prevState + 1);
  };

  /* los useEffect() se ejecutan según el orden en el que se colocan */

  /* cuando el useEffect() no tiene dependencias entonces lo que tiene dentro se ejecuta cada vez que el componente se renderiza */
  useEffect(() => {
    console.log("useEffect: no dependencies");

    /* función de limpieza cuando se desmonta el componente (cada que se da un cambio en el estado React desmonta y vuelve a montar el componente) */
    return () => {
      console.log("clean-up: no dependencies");
    };
  });

  /* cuando el useEffect() tiene un array de dependencias vacío entonces lo que tiene dentro se ejecuta la primera vez que se renderiza el componente. Tener cuidado porque si por ejemplo este useEffect() tiene una función para cambiar el estado entonces el ciclo sería: 
  1. Se instancian variables, hooks de estados, funciones, useEffect(), etc
  2. Se crea el componente en el virtual DOM
  3. El DOM pinta o renderiza por primera vez el componente
  4. Se ejecuta lo que están adentro de los useEffect() 
    4.1 Si el useEffect() ejecuta un cambio de estado entonces se vuelve a renderizar el DOM con ese último cambio */
  useEffect(() => {
    console.log("useEffect: []");

    return () => {
      console.log("clean-up: []");
    };
  }, []);

  /* cuando el useEffect() tiene un array de dependencias entonces lo que tiene dentro se ejecuta la primera vez automáticamente por ser la primera vez que se renderiza el componente, y luego cada vez que cambie alguna dependencia el useEffect() volverá a ejecutar lo que tiene dentro */
  useEffect(() => {
    console.log("useEffect: [counterState1]");

    return () => {
      console.log("clean-up: [counterState1]");
    };
  }, [counterState1]);

  useEffect(() => {
    console.log("useEffect: [counterState2]");

    return () => {
      console.log("clean-up: [counterState2]");
    };
  }, [counterState2]);

  useEffect(() => {
    console.log("useEffect: [counterState1, counterState2]");

    return () => {
      console.log("clean-up: [counterState1, counterState2]");
    };
  }, [counterState1, counterState2]);

  return (
    <div>
      {console.log("Return render")}
      <h1>Life Cycle</h1>
      <h3>Clicks Counter #1: {counterState1}</h3>
      <h3>Clicks Counter #2: {counterState2}</h3>

      <button onClick={() => handleIncrease(setCounterState1)}>
        Increment C1
      </button>

      <button onClick={() => handleIncrease(setCounterState2)}>
        Increment C2
      </button>
    </div>
  );
};
