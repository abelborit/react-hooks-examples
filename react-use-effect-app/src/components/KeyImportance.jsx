import { useEffect } from "react";
import { useState } from "react";

/* supongamos que este componente muestra el perfil de un usario según un userId y que cuando el usuario cambia entonces se resetea el comment. La idea es de que cuando se monte este componente o esta página entonces se borre el comentario pero como React muestra primero lo que tenía previamente entonces pueden haber ciertas inconsistencias en la pantalla de que primero se muestre lo anterior y luego se renderice y se actualice al nuevo comment que ahora sería un comment vacío pero también puede ser que no llegue un userId entonces se mostrará el comentario anterior y habían incoherencias en la pantalla */
// export const ProfilePage = ({ userId }) => {
//   const [commnet, setCommnet] = useState("");

//   useEffect(() => {
//     setCommnet("");
//   }, [userId]);
//   // ...

//   return <div>KeyImportance</div>;
// };

/* entonces para evitar lo anterior se hará uso de la propiedad key={} para darle un identificador único al componente, que en este caso sería para cada usuario que vaya cambiando, y que cada vez que se cambie el usuario entonces al tener una key diferente el componente también será diferente y por ende React lo renderizará con un estado completamente diferente y entonces se reseteará el comment en este caso */
export const KeyImportance = ({ userId }) => {
  return <Profile userId={userId} key={userId} />;
};

export const Profile = () => {
  const [commnet, setCommnet] = useState("");
  //...

  return <div>KeyImportance</div>;
};
