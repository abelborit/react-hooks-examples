import { useEffect, useRef, useState } from "react";

/* contar cuántas veces se renderiza un componente y mantener el valor de forma persistente */
export const RenderApp = () => {
  const [inputState, setInputState] = useState("");
  const rendersRef = useRef(1);

  const handleChangeInput = (e) => {
    setInputState(e.target.value);
  };

  /* esto crearía un loop infinito porque cada vez que se renderiza el componente llama al estado y el estado renderiza y así sucesivamente es por eso que React te salta con un warning */
  // const [rendersQuantity, setRendersQuantity] = useState(0);
  // setRendersQuantity((prevState) => prevState + 1);

  /* se coloca sin dependencias indicando que ejecutará cada vez que el componente se renderice. Esto crearía un loop infinito ya que se renderiza el componente, luego el efecto se ejecuta y cambia el estado y vuelve a hacer un renderizado y así sucesivamente */
  // useEffect(() => {
  //   setRendersQuantity((prevState) => prevState + 1)
  // })

  /* se coloca sin dependencias indicando que ejecutará cada vez que el componente se renderice */
  useEffect(() => {
    // console.log("render");
    console.log(rendersRef.current);

    // rendersRef.current = rendersRef.current + 1;
    rendersRef.current++;
  });

  return (
    <div>
      <h1>Render App</h1>
      <h3>{rendersRef.current}</h3>

      <input
        type="text"
        name="input"
        value={inputState}
        onChange={(e) => handleChangeInput(e)}
      />
    </div>
  );
};

/* Como está activado el modo estricto de React entonces en la consola aparecerá 2 y en los dev tools aparecerá 3. Si se quita el modo estricto de React entonces en la consola deberá aparecer 1 y en dev tools 2. Siguiendo esa lógica eso sucede por: */
/* 
Paso #1: se crea la referencia y comienza con el valor de 1 porque es la primera vez que se renderiza el componente
Paso #2: luego cuando se pinta en pantalla lo que se muestra es ese valor de 1
Paso #3: después se ejecuta el efecto cambiando el valor a 2 pero como este no cambia ningún estado entonces solo lo hace internamente y no pinta ni renderiza nada y como tampoco hay algo externo que cambie algún estado entonces no renderiza nada

Paso #4: con el valor de 2 en interno entonces la referencia cambia su valor a 2
Paso #5: luego cuando se pinta en pantalla lo que se muestra es ese valor de 2
Paso #6: después se ejecuta el efecto cambiando el valor a 3 pero como este no cambia ningún estado entonces solo lo hace internamente y no pinta ni renderiza nada y como tampoco hay algo externo que cambie algún estado entonces no renderiza nada
.
.
.
.
.

*/
