import { useCallback, useEffect, useMemo, useState } from "react";
import { List } from "./List";

const initialUsers = [
  {
    id: 1,
    name: "Luis",
  },
  {
    id: 2,
    name: "Maria",
  },
];

export const ListElement = () => {
  const [users, setUsers] = useState(initialUsers);
  const [textInput, setTextInput] = useState("");
  const [search, setSearch] = useState("");

  const handleAdd = () => {
    const newUser = { id: Date.now(), name: textInput };
    setUsers([...users, newUser]);
  };

  /* esta es una función que estamos pasando por props por List hasta Item y que de alguna forma esta función está cambiando cada vez que se hace un renderizado en el componente de App y al cambiar la función entonces el React.memo() de List y de Item detecta que es una propiedad distinta y por eso vuelve a renderizar el componente no usando el React.memo(). En otras palabras, esta función se vuelve a construir cada vez que haya una renderización del componente App y aunque tenga el mismo contenido se guarda en una dirección de memoria diferente y para la aplicación lo interpreta como un dato diferente. Entonces para evitar esto se tiene que memorizar la función handleDelete */
  /* el useCallback() recibe como parámetros la función a memorizar su definición y un arreglo de dependencias. Memoriza la definición de una función para evitar que se vuelve a construir */
  const handleDelete = useCallback(
    (userId) => {
      setUsers(users.filter((user) => user.id !== userId));
    },
    [users]
  );

  const handleSearch = () => {
    setSearch(textInput);
  };

  /* el useMemo() recibe como parámetros una función que retorna un valor (ese valor es el proceso que queremos memorizar) y un arreglo de dependencias */
  /* esto es una propiedad computadas que son funciones que retornan un valor y ahí sería bueno usar el useMemo() ya que estos memorizan el valor que retorna una función */
  /* como arreglo de dependencias se colocan search, users. search porque si cambia lo que se busca entonces se memoriza de nuevo y users por si se agrega un nuevo usuario entonces tiene que volver a memorizar esos usuarios */
  /* se recomienda el useMemo() por ejemplo cuando se necesita filtrar en una lista con gran cantidad de datos evitando así renderizar todo otra vez */
  const filteredUsers = useMemo(
    () =>
      users.filter((user) => {
        console.log("filter process");
        return user.name.toLowerCase().includes(search.toLowerCase());
      }),
    [search, users]
  );

  /* esta función se coloca como dependencia del useEffect() ya que está manipulando un estado (así sea solo colocándolo en el console.log() ) pero al colocarla como dependencia de un useEffect() nos saldrá un warning de que hay que colocarla dentro de un useCallback() ya que en cada renderizado se cambia la referencia de la función */
  const printUsers = useCallback(() => {
    console.log("Changed users", users);
  }, [users]);

  /* es recomendable que nada de lógica se encuentre directamente dentro del cuerpo del componente como tal, sino siempre en un efecto o en una función específica */
  /* se coloca sin dependencia ya que el efecto se ejecuta cada vez que su componente hace un render */
  useEffect(() => {
    console.log("App render");
  });

  useEffect(() => {
    printUsers();
  }, [users, printUsers]);

  return (
    <div>
      <h2>List Element</h2>

      <input
        type="text"
        value={textInput}
        onChange={(e) => setTextInput(e.target.value)}
      />

      <button onClick={handleSearch}>Search</button>

      <button onClick={handleAdd}>Add</button>

      <List users={filteredUsers} handleDelete={handleDelete} />
    </div>
  );
};
