import { useState } from "react";

/* función costosa a modo de ejemplo para obtener el initialState */
function heavyInitialState() {
  for (let i = 0; i < 1000000; i++) {
    console.log("excecuted function");

    return 0;
  }
}

export const HeavyInitialStateApp = () => {
  /* al hook useState se le puede pasar un valor o también una función (función flecha o función clásica) que devuelve el estado inicial con el que queremos que empiece. La diferencia de hacerlo de una forma u otra es que con la función se hará una inicialización lazy del estado porque la necesitamos solo en el render inicial para obtener ese estado inicial y no cuando se hagan otras renderizaciones aparte o externas, es decir, por ejemplo: 

  - Si nosotros tenemos que realizar un cálculo muy costoso al inicio como en la función heavyInitialState() para poder encontrar el valor inicial que usará el useState y luego la respuesta de la función se la asignamos directamente como "const initialCountState = heavyInitialState();" entonces en cada renderizado se llamará a esa función heavyInitialState() aunque esté creda afuera del componente principal y con esto hay una pérdida de rendimiento. 
  
  - Entonces lo que ayuda al pasarle una función al useState es que ya no se ejecutará la función costosa para el initialState dada por la función heavyInitialState() en cada renderizado, solo será la primera vez ya que el componente es creado y esto ayudará un poco más en el rendimiento de la aplicación. 
  
  -También se puede implementar de esta forma cuando por ejemplo se usa el localStarage para obtener el valor inicial ya que al final de cuentas esto viene a ser como una búsqueda en una mini base de datos que tiene el navegador, entonces al usar la función en el useState es como encapsularla y se utiliza solo una vez que es el primer render */
  // const initialCountState = heavyInitialState();
  // const [counterState, setCounterState] = useState(initialCountState);

  const [counterState, setCounterState] = useState(function () {
    const initialCountState = heavyInitialState();
    return initialCountState;
  });

  const handleIncrease = () => {
    setCounterState((prevState) => prevState + 1);
  };

  return (
    <div>
      <h1>Heavy Initial Clicks: {counterState}</h1>
      <button onClick={handleIncrease}>Increment</button>
    </div>
  );
};
