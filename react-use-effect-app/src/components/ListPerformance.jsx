import { useEffect, useState } from "react";

/* supongamos que este componente recibe una lista para mostrar, ya sea que el usuario esté mostrando un toDo list o algo similar. Entonces tenemos dos estados para guardar la selección ya que por ejemplo el usuario puede tener checkbox para seleccionar uno o varios toDo */
// export const List = ({ items }) => {
//   const [isReverse, setIsReverse] = useState(false);
//   const [selection, setSelection] = useState(null);

//   /* evitar ajustar el estado en el cambio de props en un efecto ya que si alguno de los elementos de la lista cambia entonces este efecto se disparará y aunque funcione no sería lo adecuado ya que se pueden estar haciendo re-renderizados innecesarios */
//   useEffect(() => {
//     setSelection(null);
//   }, [items]);
//   // ...

//   return <div>List</div>;
// };

export const ListPerformance = ({ items }) => {
  const [isReverse, setIsReverse] = useState(false);
  const [selection, setSelection] = useState(null);
  const [prevItems, setPrevItems] = useState(items);

  /* es mejor ajustar el estado en tiempo de rendering, es decir, cuando se renderice el componente teniendo un estado para guardar la lista anterior y hacer una validación y si se cumple entonces recién se actualiza el estado y con esto nos evitamos estar haciendo use del useEffect y que se dispare innecesariamente ocasionando re-rendering */
  if (items !== prevItems) {
    setPrevItems(items);
    setSelection(null);
  }

  return <div>ListPerformance</div>;
};
