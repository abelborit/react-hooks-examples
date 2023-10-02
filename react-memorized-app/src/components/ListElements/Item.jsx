// import PropTypes from "prop-types";
import React, { useEffect } from "react";

/* se memoriza este componente con el fin que no se rendericen los otros elementos ya que si se agrega un nuevo usuario entonces solo se tendría que renderizar ese nuevo usuario */
export const Item = React.memo(({ elementUser, handleDelete }) => {
  useEffect(() => {
    console.log("Item render" + " - " + elementUser.name);
  });

  return (
    <li>
      {elementUser.name}

      <button onClick={() => handleDelete(elementUser.id)}>Delete</button>
    </li>
  );
});

// Item.propTypes = {
//   elementUser: PropTypes.shape({
//     id: PropTypes.number,
//     name: PropTypes.string,
//   }),
// };

// La propiedad displayName se utiliza para dar un nombre descriptivo a los componentes de la extensión React devtools.
Item.displayName = "Item";
