import { useEffect, useRef, useState } from "react";

export const ScrollAnimationApp = () => {
  const [background, setBackground] = useState("blue");
  const divRef = useRef();

  useEffect(() => {
    const handleScroll = () => {
      /* método del DOM para obtener el alto, ancho y posición relativa del elemento y la posición con respecto a la pantalla. El "y" dará un valor positivo cuando esté por encima del elemento, un valor negativo cuando esté por debajo del elemento y un cero cuando esté justo en el elemento */
      // console.log(divRef.current.getBoundingClientRect());
      const { y } = divRef.current.getBoundingClientRect();
      // console.log(y);

      const newBackgroundColor = y <= 0 ? "orange" : "blue";
      setBackground(newBackgroundColor);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div style={{ height: "180vh", backgroundColor: background }} ref={divRef}>
      <h1>Scroll Animation App</h1>
      <h3>Scroll to change background color</h3>
    </div>
  );
};
