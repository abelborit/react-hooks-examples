import { forwardRef, useImperativeHandle, useState } from "react";

/* al usar forwardRef() acepta dos parámetros: forwardRef((props, ref) => {...}) y tienen que ir en ese orden porque sino dará un error en consola */
export const NoteButton = forwardRef((props, ref) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleShowHideNote = () => {
    setIsVisible(false);
  };

  useImperativeHandle(
    /* primer paso: ver en dónde queremos guardar esta función que queremos ejecutar desde fuera del componente (se usa la referencia creada anteriormente) */
    ref,

    () => {
      /* segundo paso: crear una función que va a retornar un objeto y eso será lo que se guardará en la ref del primer paso para poder usarlo fuera de este componente  */
      return {
        handleShowHideNote,
        /* más propiedades... */
      };
    }
  );

  return (
    <>
      {isVisible ? (
        /* es para evitar tener problemas con los prop-types */
        // eslint-disable-next-line react/prop-types
        <button onClick={props.handleCreateNote}>Create Note</button>
      ) : null}
    </>
  );
});

/* La propiedad displayName se utiliza para dar un nombre descriptivo a los componentes de la extensión React devtools y se usa en este caso porque como está el forwardRef() entonces este envuelve al componente y le da ese nombre de forwardRef entonces con displayName se cambia al nombre que queremos que en este caso será el mismo que el de la función "NoteButton" */
NoteButton.displayName = "NoteButton";
