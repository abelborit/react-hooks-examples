import { useEffect } from "react";
import { useState } from "react";

const windowWidthFunction = () => {
  console.log("window");
  return window.innerWidth;
};

export const ResizeApp = () => {
  // const windowWidthValue = windowWidthFunction();
  // const [windowWidth, setWindowWidth] = useState(windowWidthValue);

  /* para evitar renderizados innecesarios y que se llame window.innerWidth solo la primera vez que se renderiza el componente */
  // const [windowWidth, setWindowWidth] = useState(function () {
  //   const windowWidthValue = windowWidthFunction();
  //   return windowWidthValue;
  // });

  /* forma corta con return explícito ya que es solo una línea de código */
  const [windowWidth, setWindowWidth] = useState(() => windowWidthFunction());

  const styleProps = {
    backgroundColor:
      windowWidth >= 1200
        ? "blue"
        : windowWidth >= 768
        ? "red"
        : windowWidth >= 320 && "green",
  };

  useEffect(() => {
    const handleResize = () => {
      console.log("resize render");
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      console.log("useEffect cleaned");
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div style={styleProps}>
      <h1>Resize App: {windowWidth}</h1>
    </div>
  );
};
