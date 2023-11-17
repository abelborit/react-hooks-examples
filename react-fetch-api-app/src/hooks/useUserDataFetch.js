import { useEffect, useState } from "react";

/* hacer peticiones fetch con un manejo de cancelación de peticiones ya sea con una función como handleCancelRequest o sino también de forma automática cuando se destruya o desmonte el componente */
/* por ejemplo, cuando el usuario está en una página de películas y entra a una sección pero en cuestión de milisegundos se dirige a otra sección entonces ahí ya se estaría haciendo una petición al backend aunque al final en el frontend no se renderice pero ya se hizo la petición, se consumieron recursos de red y del servidor si no logramos manejar este tema. Entonces para evitar esto se usará el abortController para que cada que se destruya el componente entonces se cancele la petición también y con eso nos evitamos estar haciendo peticiones al backend de forma innecesaria */
export const useUserDataFetch = (URL) => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [controller, setController] = useState(null); // se crea este estado para que se pueda manejar dentro del useEffect() y también en la función handleCancelRequest

  useEffect(() => {
    const abortController = new AbortController();
    setController(abortController);

    setIsLoading(true); // asegurarnos de que al principio el isLoading esté en true aunque su valor inicial ya sea true, pero no está de más asegurase por si se recarga la aplicación o se lanza un efecto secundario o cualquier cosa entonces setearlo a true desde un inicio

    const getFetch = async (URL) => {
      try {
        let response = await fetch(URL, {
          /* con el signial es como si le pusiéramos un restreador a la petición y que podamos controlar ciertos aspectos de la petición */
          signal: abortController.signal,
        });

        if (!response.ok) {
          throw new Error("Error en la petición");
        }

        let data = await response.json();

        setUserData(data);
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Request Cancelled");
        } else {
          setError(error);
        }
      } finally {
        /* en el .finally() nos aseguramos de que al final de que se resuelvan las promesas sí o sí se cambie el isLoading a false o el código que se quiera adicionar independientemente si el resultado de la promesa fue positivo o negativo */
        setIsLoading(false);
      }
    };

    getFetch(URL);

    // fetch(URL, {
    //   signal: abortController.signal,
    // })
    //   .then((response) => response.json())
    //   .then((dataResponse) => setUserData(dataResponse))
    //   .catch((error) => {
    //     if (error.name === "AbortError") {
    //       console.log("Request Cancelled");
    //     } else {
    //       setError(error);
    //     }
    //   })
    //   .finally(() => setIsLoading(false)); // se podría colocar el setIsLoading(false) en el último .then() pero al colocarlo en el .finally() nos aseguramos de que al final de que se resuelvan las promesas sí o sí se cambie el isLoading a false o el código que se quiera adicionar independientemente si el resultado de la promesa fue positivo o negativo. NO sería recomendado colocarlo fuera del fetch() ya que por la asincronía de JavaScript puede ser que el setIsLoading(false) se ejecute antes que la propia promesa así que hay que seguir la lógica asíncrona

    /* con la función de limpieza del useEffect() nos ayuda a realizar alguna limpieza o funcionalidad cuando el componente se destruye o se desmonta, es decir, cuando el componente ya no es visible en pantalla (cuando se cambia de ruta, cuando se cierra la pestaña, etc) */
    return () => abortController.abort();
  }, [URL]);

  const handleCancelRequest = () => {
    if (controller) {
      controller.abort();
      setError("Request Cancelled");
    }
  };

  return { userData, error, isLoading, handleCancelRequest };
};
