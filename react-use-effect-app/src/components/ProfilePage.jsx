import { /* useEffect, */ useState } from "react";

/* este componente muestra el perfil de un usuario según un userId y lo que se quiere es que cuando el usuario cambie entonces se resetee el comment. La idea es que cuando se monte este componente o esta página entonces se borre el comentario pero como React muestra primero lo que tenía previamente entonces pueden haber ciertas inconsistencias en la pantalla de que primero se muestre el estado anterior y luego se renderice y se actualice al nuevo comment que ahora sería un comment vacío usando el useEffect() pero también puede ser que no llegue un userId entonces se mostrará el comentario anterior y habrían incoherencias en la pantalla. Muy aparte que usando el useEffect() hay más renderizados porque primero se tendría que renderizar el componente padre <UserPage /> para poder mostrar el componente <ProfilePage /> y cuando este se monte entonces se carga el hook useEffect() pero aún no se dispara, luego se renderiza lo que hay en el return y recién se dispara el useEffect() que cambiará el estado interno de este componente y otra vez se renderiza el componente (porque cambió su estado) con la última actualización del estado. Como vemos hay renders de más por el propio ciclo de vida de React que con el uso de las key los podemos evitar mejorando su rendimiento */
console.log("render inicio");

export const ProfilePage = ({ userId }) => {
  console.log("render componente");
  const [comment, setComment] = useState("");

  const handleInput = (e) => {
    setComment(e.target.value);
  };

  // useEffect(() => {
  //   console.log("render useEffect");
  //   setComment("");
  // }, [userId]);

  return (
    <div>
      {console.log("render return")}
      <h2>Profile Page: {userId}</h2>

      <div>
        <input type="text" onChange={handleInput} value={comment} />
      </div>

      <p>Comentario: {comment}</p>
    </div>
  );
};

/* con el useEffect() las renderizaciones al cambiar de opción en el select:
1. render componente
2. render return
3. useEffect
4. render componente
5. render return */

/* con el uso de key={} las renderizaciones al cambiar de opción en el select:
1. render componente
2. render return */
