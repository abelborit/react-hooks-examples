// import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { Item } from "./Item";

/* se usa React.memo() para memorizar un componente si sus propiedades no cambian y con eso evitar re-renderizados innecesarios */
/* es recomendable usar React.memo() cuando haya como data una gran cantidad de datos, listas o cuando se hagan llamadas a API's para evitar realizar de nuevo esa carga */
export const List = React.memo(({ users, handleDelete }) => {
  useEffect(() => {
    console.log("List render");
  });

  return (
    <ul>
      <h1>List</h1>

      {users.map((elementUser) => (
        <Item
          key={elementUser.id}
          elementUser={elementUser}
          handleDelete={handleDelete}
        />
      ))}
    </ul>
  );
});

// List.propTypes = {
//   users: PropTypes.arrayOf(
//     PropTypes.shape({
//       id: PropTypes.number,
//       name: PropTypes.string,
//     })
//   ),
// };
// La propiedad displayName se utiliza para dar un nombre descriptivo a los componentes de la extensión React devtools.
List.displayName = "List";
