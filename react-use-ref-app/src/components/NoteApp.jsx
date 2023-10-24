import { useRef, useState } from "react";
import { NoteButton } from "./NoteButton";

const initialState = [
  {
    name: "Nota1",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint in, eius facere doloremque provident fugiat ratione, nihil ipsum at estvel! Dolorem nobis in at quaerat illum velit obcaecati sapiente. Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem nostrum, perspiciatis nihil aperiam libero ea ex aliquam nulla eumeos laudantium obcaecati voluptas itaque aspernatur et voluptatibus? Aspernatur, sed necessitatibus?",
  },
];

/* si el estado del componente NoteButton.jsx estuviera en este componente que es el componente padre sería mucho más rápido y facil pero al querer mantener el estado en el componente hijo y querer que el componente padre cambie ese estado, entonces se está usando el useRef() desde aquí y luego se está envolviendo al componente hijo con el forwardRef() y ya se puede pasar la ref como propiedad */
/* como el componente NoteButton.jsx tiene una función que nosotros queremos usar desde este componente hay que usar el useImperativeHandle() que nos ayuda a definir funciones en un componente que se puede invocar fuera del componente y no va a cambiar su valor a menos que se le indique en las dependencias (similar al uso de un useEffect({}, [])) */
export const NoteApp = () => {
  const [noteData, setNoteData] = useState(initialState);
  /* El initialValue en useRef(initialValue) es el valor que quieres que tenga inicialmente la propiedad current del objeto ref. Puede ser un valor de cualquier tipo. Este argumento se ignora después del renderizado inicial */
  const elementRef = useRef(null);

  const handleCreateNote = () => {
    setNoteData([
      ...noteData,
      {
        name: "Nota2",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint in, eius facere doloremque provident fugiat ratione, nihil ipsum at estvel! Dolorem nobis in at quaerat illum velit obcaecati sapiente. Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem nostrum, perspiciatis nihil aperiam libero ea ex aliquam nulla eumeos laudantium obcaecati voluptas itaque aspernatur et voluptatibus? Aspernatur, sed necessitatibus?",
      },
    ]);

    /* se llama a la función dentro de la referencia que se tenía hacia otro componente para poder deshabilitar el botón de crear la nota */
    elementRef.current.handleShowHideNote();
  };

  return (
    <>
      <h1>NoteApp</h1>

      {noteData.map((element) => (
        <div key={element.name}>
          <p>{element.name}</p>
          <span>{element.description}</span>
        </div>
      ))}

      <NoteButton ref={elementRef} handleCreateNote={handleCreateNote} />
    </>
  );
};
