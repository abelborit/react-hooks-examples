/* no necesitamos usar ningún estado de carga ni activar una solicitud de red dentro de un useEffect(), como hicimos con el enfoque tradicional (Fetch-on-render) */
/* TENGA EN CUENTA que cómo comenzamos a buscar antes de que comience la renderización , es decir, comenzamos a buscar datos fuera de la definición del componente . Obtener de esta manera significa que para cuando React comience a renderizar el componente, ya estamos buscando nuestros datos. De ahí un aspecto crucial de Render-as-You-Fetch. La velocidad de aplicación mejora drásticamente. */

function getSuspender(promise) {
  /* variables que pueden reemplazar el estado de la promesa fetch() en React */
  let status = "pending"; // estado de la promesa
  let response; // para el resultado final

  /* esta es otra forma de tratar las promesas, tener funciones para el resultado aceptado y para el error o sino tener el .catch() después del .then() */
  // const suspender = promise.then(
  //   (responseFetch) => {
  //     status = "success";
  //     response = responseFetch;
  //   },
  //   (errorFetch) => {
  //     status = "error";
  //     response = errorFetch;
  //   }
  // );

  const suspender = promise
    .then((responseFetch) => {
      status = "success";
      response = responseFetch;
    })
    .catch((errorFetch) => {
      status = "error";
      response = errorFetch;
      // throw errorFetch; // Lanzar el error para que se propague a la función read
    })
    .finally(() => {
      console.log("finally");
    });

  /* función de lectura para la situación de la promesa que sería pending, error o success. Es una función que se comporta de la manera esperada por <Suspense></Suspense>. Si la recuperación de datos aún no se resuelve, genera una promesa. Si tiene éxito, devuelve el resultado; de lo contrario, arroja un error. */
  const read = () => {
    switch (status) {
      case "pending": // cuando se está cargando la promesa
        throw suspender;
      case "error": // cuando hay un error
        throw response;
      case "success": // cuando está bien la respuesta de la promesa
        return response;

      // default: // cualquier otro caso devolver el response (que sería cuando ya se resolvió la promesa correctamente)
      //   return response;
    }
  };

  /* de la función getSuspender() vamos a retornar la función read() */
  return {
    read,
  };
}

export const fetchRenderAsYouFetch = (url) => {
  /* guardar en una variable el resultado de la promesa donde aún no sabemos si se resolvió o si fue rechazada. Es una promesa que está como pendiente aún */
  const promise = fetch(url)
    .then((response) => response.json())
    .then((dataResponse) => dataResponse);
  // .catch((error) => {
  //   console.error("Error en la llamada a fetch:", error);
  //   // Puedes realizar acciones adicionales en caso de error si es necesario
  //   throw error; // Lanzar el error para que se propague y sea manejado correctamente en la función getSuspender
  // });

  /* no se retornará la variable promise porque sino no se podría utilizar en el componente RenderAsYouFetchComponent o en el componente donde la utilicemos porque deberíamos tener una función asíncrona que la resuelva y sería hacer exactamente lo mismo que siempre se hace. En lugar de eso se utilizará la función getSuspender() que la implementaremos para que reciba la variable promise y esta función se engarcará de ejecutar la asincronía */
  return getSuspender(promise);
};
