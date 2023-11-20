import React, { useState } from "react";

export const Item = React.memo(({ user }) => {
  const [isActive, setIsActive] = useState(false);
  console.log(user);

  const handleActive = () => {
    setIsActive(!isActive);
  };

  /* para ver cómo afecta usar key propias de cada elemento y usar los índices como key */
  const backgroundColorCustom = isActive ? "green" : "red";

  return (
    <div style={{ backgroundColor: backgroundColorCustom }}>
      <button onClick={handleActive}>{user.name}</button>
    </div>
  );
});

// La propiedad displayName se utiliza para dar un nombre descriptivo a los componentes de la extensión React devtools.
Item.displayName = "Item";
