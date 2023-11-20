import { useState } from "react";
import { ProfilePage } from "./ProfilePage";

export const UserPage = () => {
  const [userId, setuserId] = useState("");

  const handleUserId = (e) => {
    setuserId(e.target.value);
  };

  return (
    <div>
      <h2>UserPage</h2>

      <div>
        <select name="user" id={userId} onChange={handleUserId}>
          <option value="1">Usuario A</option>
          <option value="2">Usuario B</option>
          <option value="3">Usuario C</option>
        </select>
      </div>

      {/* para evitar el problema colocado en <ProfilePage /> se hará uso de la propiedad key={} para darle un identificador único al componente <ProfilePage />, que en este caso sería para que cada usuario que vaya cambiando tenga un identificador único y que cada vez que se cambie el usuario entonces el componente al tener una key diferente el componente también será diferente y por ende React lo renderizará con un estado completamente nuevo y se reseteará el estado del comment en este caso y con esto nos evitamos renders innecesarios */}
      <ProfilePage userId={userId} key={userId} />
    </div>
  );
};
