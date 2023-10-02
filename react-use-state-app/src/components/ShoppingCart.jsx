import { useState } from "react";

const initialCartState = [
  { id: 1, title: "Producto #1", description: "Descripción #1" },
  { id: 2, title: "Producto #2", description: "Descripción #2" },
  { id: 3, title: "Producto #3", description: "Descripción #3" },
];

export const ShoppingCart = () => {
  const [cartState, setCartState] = useState(initialCartState);

  const handleAddProduct = () => {
    if (!cartState.length) {
      setCartState([
        ...cartState,
        {
          id: 1,
          title: "Producto #1",
          description: "Descripción #1",
        },
      ]);
    }

    setCartState([
      ...cartState,
      {
        id: cartState[cartState.length - 1].id + 1,
        title: `Producto #${cartState[cartState.length - 1].id + 1}`,
        description: `Descripción #${cartState[cartState.length - 1].id + 1}`,
      },
    ]);
  };

  const handleUpdateProduct = (productToEdit) => {
    const newCartState = cartState.map((productElement) =>
      productElement.id === productToEdit.id
        ? {
            id: productToEdit.id,
            title: "Producto Editado",
            description: "Descripción Editada",
          }
        : productElement
    );
    setCartState(newCartState);
  };

  const handleDeleteProduct = (productId) => {
    /* filter cuando son pocos elementos ya que este lee todo el arreglo y si son bastantes elementos puede afectar el rendimiento */
    // const newCartState = cartState.filter(
    //   (element) => element.id !== productId
    // );

    /* findIndex encuentra el índice del primer elemento que coincide con la condición. Se usa en un arreglo con bastantes elementos para mejorar el rendimiento. Si existe retornar el índice y si no existe retorna un -1 */
    const productToDeleteIndex = cartState.findIndex(
      (element) => element.id === productId
    );

    if (productToDeleteIndex !== -1) {
      /* TRABAJANDO CON SLICE */
      /* slice no muta el arreglo original y se puede trabajar de forma directa ya que retorna un nuevo arreglo */
      /* slice(inicio índice, fin índice) */
      const deleteAtIndex = (originalArray, indexToDelete) => {
        return [
          ...originalArray.slice(0, indexToDelete),
          ...originalArray.slice(indexToDelete + 1),
        ];
      };
      const newCartState = deleteAtIndex(cartState, productToDeleteIndex);
      setCartState(newCartState);

      /* TRABAJANDO CON SPLICE */
      /* Crear una copia del estado actual porque el método splice muta el arreglo original */
      // const newCartState = [...cartState];

      /* splice cambia el contenido de un array eliminando elementos existentes y/o agregando nuevos elementos */
      /* splice(inicio índice, # elementos a borrar, valor a agregar que es opcional), si el valor opcional no se coloca entonces el splice se utiliza para eliminar desde el inicio del índice hasta el final del índice */
      // newCartState.splice(productToDeleteIndex, 1);

      // setCartState(newCartState);
    }
  };

  const handleDeleteShoppingCart = () => {
    setCartState([]);
  };

  return (
    <div>
      <h1>Shopping Cart</h1>
      <pre style={{ textAlign: "left" }}>
        {JSON.stringify(cartState, null, 2)}
      </pre>

      <button onClick={handleAddProduct}>Add Product</button>

      {cartState.length > 0 ? (
        <ul style={{ listStyle: "none", width: "100%", padding: "0" }}>
          {cartState.map((element) => (
            <div
              style={{ backgroundColor: "#333", marginBottom: "12px" }}
              key={element.id}
            >
              <li>{element.title}</li>
              <span>{element.description}</span>

              <br />
              <button onClick={() => handleUpdateProduct(element)}>
                Edit Product
              </button>

              <button onClick={() => handleDeleteProduct(element.id)}>
                Delete Product
              </button>
            </div>
          ))}
        </ul>
      ) : (
        <p>There are not products in the shopping cart</p>
      )}

      <button onClick={handleDeleteShoppingCart}>Delete Shopping Cart</button>
    </div>
  );
};
