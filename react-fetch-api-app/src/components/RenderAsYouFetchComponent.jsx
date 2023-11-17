import { Suspense } from "react";
import { fetchRenderAsYouFetch } from "../helpers/fetchRenderAsYouFetch";

/* utilizar el Render As You Fetch es renderizarse cuando se realice el fetching de datos porque cuando se utiliza el useEffect() entonces hay renderizados adicionales por eso es que se puede cambiar el isLoading de true a false porque como se sabe, se realiza un nuevo renderizado cada vez que se cambie el estado interno de la aplicación. Si la aplicación es pequeña entonces no afecta tan negativamente el performance y rendimiento de la misma pero si la aplicación es medianamente grande, entonces puede ser un problema */
const apiData = fetchRenderAsYouFetch(
  "https://jsonplaceholder.typicode.com/users"
);

export const RenderAsYouFetchComponent = () => {
  const userData = apiData.read();

  /* Sería útil manejar los errores que puedan ocurrir durante la lectura de los datos utilizando try y catch. Esto garantizará que cualquier error en la lectura de datos sea capturado y manejado adecuadamente. */
  try {
    /* con el suspense haremos un mejor uso del loading hasta que los datos se carguen sin que interfiera en los renderizados de la página y la petición al API se hará fuera del componente y también fuera de cualquier hook de useEffect() y por lo tanto no se harán renderizados innecesarios */
    return (
      <div>
        <h1>RenderAsYouFetchComponent</h1>
        {/* <Suspense> es un componente que permite cargar componentes, datos o cualquier otro código de forma asíncrona, y especificar de forma declarativa una interfaz de usuario de carga mientras el usuario espera. Esto nos permite crear aplicaciones con mejor capacidad de respuesta y transiciones de estado/página más fluidas */}
        {/* mientras no estén listos los datos entonces no se va a renderizar y el Suspense nos ayudará por si alguna razón sus hijos no se han renderizado o hay algún error entonces nos mostrará el fallback={} y aquí nos estamos evitando dobles renderizados */}
        <Suspense fallback={<div>Loading...</div>}>
          <ul>
            {userData?.map((userElement) => (
              <li key={userElement.id}>{userElement.name}</li>
            ))}
          </ul>
        </Suspense>
      </div>
    );
  } catch (error) {
    // Manejo de errores durante la lectura de datos
    console.error("Error al leer datos:", error);
    return (
      <div>
        <h1>RenderAsYouFetchComponent</h1>
        <p>Error al cargar los datos...</p>
      </div>
    );
  }
};
