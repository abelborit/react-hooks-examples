import { useState } from "react";

const initialProduct = {
  title: "Título",
  description: "Descripción",
  image: {
    small: "url small",
    medium: "url small",
    big: "url small",
  },
};

export const ProductApp = () => {
  // const [productState, setProductState] = useState({});
  const [productState, setProductState] = useState(initialProduct);

  const handleUpdateProduct = () => {
    setProductState({
      ...productState,
      title: "Titulo 2",
      description: "Descripción 2",
    });
  };

  const handleDynamicUpdateProduct = (property, value) => {
    setProductState({
      ...productState,
      [property]: value,
    });
  };

  return (
    <div>
      <h1>Product</h1>
      <pre style={{ textAlign: "left" }}>
        {JSON.stringify(productState, null, 2)}
      </pre>

      <h3>{productState.title}</h3>
      <h3>{productState.description}</h3>

      {/* al colocar el useState como un objeto vacío entonces al primer nivel (title y description) no hay ningún problema pero al querer ingresar ya a un segundo nivel (image: {small, medium, big }) entonces nos da error y para eso se tiene que usar "?" y preguntar si existe o no esa propiedad */}
      {/* <img src={productState.image?.small} alt={productState.image?.medium} /> */}

      {/* lo recomendable sería usar un initialState para hacerlo de forma directa y también sirve como guía de lo que se quiere utilizar */}
      <img src={productState.image.small} alt={productState.image.medium} />
      <br />

      <button onClick={handleUpdateProduct}>Update Product</button>

      <button
        onClick={() => handleDynamicUpdateProduct("title", "Título Dinámico")}
      >
        Dynamic Update Title
      </button>

      <button
        onClick={() =>
          handleDynamicUpdateProduct("description", "Descripción Dinámica")
        }
      >
        Dynamic Update Description
      </button>
    </div>
  );
};
