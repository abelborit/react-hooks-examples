import { useRef, useState } from "react";

/* asignar el foco (focus) a un input mediante click de un botón */
export const FocusApp = () => {
  const [inputState, setInputState] = useState("");
  /* por conveniencia se coloca el nombre seguido del Ref para saber que se está trabajando con una referencia. Al useRef() podemos enviarle o no un valor inicial pero cuando se trabaja con el DOM no es necesario mandarle ningún parámetro. Cada vez que necesitemos interactuar con el DOM usamos una referencia */
  const inputRef = useRef();

  const handleChangeInput = (e) => {
    setInputState(e.target.value);
  };

  const handleFocusInput = () => {
    /* trabajar de esta forma no es recomendable, antes era fácil cuando se trabaja individualmente porque se sabía cómo controlar los id y darles id únicos a cada elemento pero al ser un trabajo con varias personas trabajar así ya se vuelve complicado usando librerías de terceros o haciendo artificios a los id para que sean únicos como usar hashes o nombres raros seguidos del nombre del input */
    // const input = document.getElementById("input");
    // console.log(input);
    // input.value = "Texto mutado";
    // input.focus();

    /* al trabajar con referencias podemos ir a las herramientas del desarrollador del navegador y nos daremos cuenta que cuando se muta el texto usando la referencia este no cambia el estado de React y con eso se evita realizar renderizados innecesarios. Luego ya estando el value mutado y se escribe algo en el input entonces recién vemos que el state toma todo el valor del input incluyendo lo que se colocó antes con la referencia */
    /* trabajarlo de esta forma para mutar algo directamente no es lo recomendable ya que pueden haber inconsistencias porque mientras que en el DOM Real hay un texto en el state puede o no haberlo, entonces hay que tener presente para qué se usarán las referencias. En este caso es un caso normal de uso ya que como no modifica el estado y es solo para mantener el foco del input al hacer click en el botón, entonces este sería un uso correcto */
    // console.log(inputRef.current);
    // inputRef.current.value = "Texto mutado";
    inputRef.current.focus();
  };

  return (
    <div>
      <h1>Focus App</h1>

      <input
        // id="input"
        ref={inputRef}
        type="text"
        name="input"
        value={inputState}
        onChange={(e) => handleChangeInput(e)}
      />

      <button onClick={handleFocusInput}>Focus</button>
    </div>
  );
};
