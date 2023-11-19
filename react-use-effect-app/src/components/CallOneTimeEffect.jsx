import { useEffect } from "react";

/* supongamos que este es un componente donde se cargan desde el inicio varias cosas de la aplicación como funciones, tokens, autenticación, permisos, llamadas a API, etc. Entonces lo que usualmente colocamos es todo en un useEffect() para que se renderice o se cargue pero nos daremos cuenta de que en modo desarrollo todo esto se renderiza dos veces y es por temas del modo estricto propio de React */

/* MALA PRÁCTICA (funciona normal pero es una mala práctica porque se llamaría dos veces, por ejemplo cuando se hace una llamada a una API esta se podría llamar dos veces y producir efectos adversos o no deseados o afectar al performance de la aplicación) */
// export const CallOneTimeEffect = () => {
//   useEffect(() => {
//     console.log("function logic one");
//     console.log("function logic two");
//     console.log("call API one");
//     console.log("call API two");
//   }, []);

//   return <div>Call One Time Effect</div>;
// };

/* BUENA PRACTICA colocar una variable indicando que es false la primera vez y luego cuando se monte el componente entonces pasarla a true y esto hará que la lógica solo se ejecute una vez. Entonces mantener la comprobación de que si el componente está montado para evitar actualizaciones de estado innecesarias después de que el componente se desmonte */
let isMounted = false;

export const CallOneTimeEffect = () => {
  useEffect(() => {
    if (!isMounted) {
      isMounted = true;

      console.log("function logic one");
      console.log("function logic two");
      console.log("call API one");
      console.log("call API two");
    }
  }, []);

  /* OTRA FORMA para hacer lo mismos pero sin useEffect() es usando una validación para asegurarnos que estamos en el frontend, es decir, en el navegador y con esto al usar librerías o aplicaciones con server side rendering mejorará su rendimiento. Esto primero validará si está o no en el navegador para luego ejecutar la lógica */
  // if (typeof window !== "undefined") {
  //   console.log("function logic one");
  //   console.log("function logic two");
  //   console.log("call API one");
  //   console.log("call API two");
  // }

  return <div>Call One Time Effect</div>;
};
