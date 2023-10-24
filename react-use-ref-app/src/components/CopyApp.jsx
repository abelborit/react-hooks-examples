import { useRef, useState } from "react";

/* al hacer click en el botón vamos a seleccionar el texto y lo copiaremos en el porta papeles */
export const CopyApp = () => {
  const [inputState, setInputState] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  /* por conveniencia se coloca el nombre seguido del Ref para saber que se está trabajando con una referencia. Al useRef() podemos enviarle o no un valor inicial pero cuando se trabaja con el DOM no es necesario mandarle ningún parámetro. Cada vez que necesitemos interactuar con el DOM usamos una referencia */
  const inputRef = useRef();

  const handleChangeInput = (e) => {
    setInputState(e.target.value);
  };

  const handleCopyInput = () => {
    inputRef.current.select();
    /* para copiar un texto seleccionado en el porta papeles. Está como deprecado este método pero aún funciona */
    document.execCommand("copy");

    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  return (
    <div>
      <h1>Copy App</h1>
      {isCopied && (
        <>
          <span>This Text is copied!!</span>
          <br />
          <br />
        </>
      )}

      <input
        ref={inputRef}
        type="text"
        name="input"
        value={inputState}
        onChange={(e) => handleChangeInput(e)}
      />

      <button onClick={handleCopyInput}>Copy</button>
    </div>
  );
};
