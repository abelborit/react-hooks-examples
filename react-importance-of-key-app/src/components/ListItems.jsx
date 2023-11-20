import { useState } from "react";
import { Item } from "./Item";

const userList = [
  {
    id: 1,
    name: "A",
  },
  {
    id: 2,
    name: "B",
  },
  {
    id: 3,
    name: "C",
  },
];

export const ListItems = () => {
  const [countState, setCountState] = useState(0);
  const [itemsList, setitemsList] = useState(userList);

  const handleIncrease = () => {
    setCountState((prevState) => prevState + 1);
  };

  const handleReverse = () => {
    setitemsList(itemsList.reverse());
    setCountState((prevState) => prevState + 1);
  };

  return (
    <>
      <button onClick={handleIncrease}>{countState}</button>

      <button onClick={handleReverse}>Reverse List</button>

      {/* si no se coloca un key explicitamente al componente en un .map() entonces React lo que hace es colocar una key de forma implícita y por defecto colocará el índice de los elementos, es decir que es igual colocar key={index} a no colocar nada porque React por defecto toma el índice de las posiciones en el array y lo coloca */}
      {/* la idea principal de usar las key o claves es que React tratará de aprovechar lo más que pueda la reutilización de los elementos disponibles ya renderizados o pintados de modo que pueda utilizar ese proceso realizado de consolidación (enviar elementos del virtual DOM al DOM para así poder usar lo que ya está renderizado). El proceso de mandar un elemento del virtual DOM al DOM por primera vez, es lo que se conoce como "montar un componente" y este proceso es costoso porque significa renderizarlo y pintarlo por primera vez, pero si yo ya tengo elementos renderizados y pintados entonces se puede reutilziar eso. Entonces utilizar las key es una forma de relacionar el elemento o componente con lo que ya tengo renderizado o pintado directamente en el DOM para así ayudar a React a reutilizar los elementos */}
      {itemsList.map((userElement) => (
        <Item user={userElement} key={userElement.id} />
      ))}
    </>
  );
};

/* TODO LO QUE SE MENCIONARÁ ABAJO SE SOLUCIONA COLOCANDO COMO KEY UN IDENTIFICADOR ÚNICO DEL PROPIO ELEMENTO, EN ESTE CASO COLOCANDO SU id */

/* en caso no se usen las key se usaría el índice de cada elemento por defecto:
- Dentro del DOM ya tengo 3 elementos renderizados, elemento A con la key 0, elemento B con la key 1, elemento C con la key 2, entonces cuando se realice un nuevo render lo que hará React será preguntarse si la userList ha cambiado o no y entonces se van a volver a pintar los elementos pero en el proceso de enviar los elementos del Virtual DOM al DOM para que el usuario vea la renderización o los elementos en pantalla, ahí es donde se pregunta y se da cuenta que ya tiene un elemento con la key 0 y entonces vuelve a pintar el elemento pero ahora reutiliza la mayor parte de la estructura HTML que ya tenía antes para hacer que el montaje del nuevo componente dentro del DOM no sea tan costoso y sea un poco más óptimo. Entonces utilizar las key es una forma de relacionar el elemento o componente con lo que ya tengo renderizado o pintado en la UI directamente en el DOM para así ayudar a React a reutilizar los elementos. Si se quiere mejorar un poco más el rendimiento de la aplicación entonces se puede memorizar el componente <Item /> porque sus props no cambian y ya no se volvería a pintar los elementos en la UI */
// {userList.map((userElement) => (
//   <Item user={userElement} />
// ))
// }

// {userList.map((userElement, index) => (
//   <Item user={userElement} key={index}/>
// ))}

/* un antipatrón que afecta al rendimiento de React:
- Un antipatrón que afecta al rendimiento de React es colocar keys aleatorias usando key={Math.random()} entonces esto hará que el primer render el elemento A tenga una key de 0.12, elemento B una key de 0.58, elemento C con una key de 0.99, entonces con esto React al tener key diferentes y al hacer un nuevo render verá si tiene algo para poder reutilizar y al no tener entonces va a desmontar el componente anterior y pintará de nuevo el componente totalmente desde cero pero con otras key ya que ahora tendrá el elemento A tenga una key de 0.53, elemento B una key de 0.25, elemento C con una key de 0.47 lo cual afecta al rendimiento de la aplicación. En este caso el memorizar el componente <Item /> no funcionaría ya que aunque sus props no cambien el componente como tal sí cambia ya que se está renderizando de nuevo totalmente desde cero */
// {userList.map((userElement) => (
//   <Item user={userElement} key={Math.random()} />
// ))}

/* si se quiere ordenar la lista de los elementos por ascendente o descentende u otra forma y teniendo el índice del elemento como la key:
- Aquí por ejemplo al tener el elemento A con la key 0, elemento B con la key 1, elemento C con la key 2, y al querer ordenar de forma ascendente o descentende entonces veremos que solo se vuelven a pintar los elementos o mostrar el console.log() del componente <Item /> los elementos A y C ya que son los únicos que cambian de posición por sus índices porque el elemento B tiene el mismo índice y aunque se tenga memorizado el componente <Item /> no surtiría efecto en los elementos A y C porque precisamente se están cambiando sus índices ya que ahora elemento A tendría la key de 2 y el elemento C tendría la key de 0, si se tuvieran 4 elementos incluyendo D con la key 3 entonces recién variarían todos los elementos y se volverían a renderizar todo ya que los elementos no tienen la misma key al renderizar y por ende no se puede reutilizar su estructura */

/* un pequeño tip al usar paginación y listas pero que los índices sean las key:
- Al tener por ejemplo una paginación de atrás y adelante donde se pinten por ejemplo elementos de D, E y F, al colocarle su id como key entonces sería elemento D con key 4, elemento E con key 5, elemento F con key 6 y lo que React haría al renderizar nuevamente la UI es que no va a encontrar elementos en el DOM con esas key, ya que al principio eran las key 1, 2 y 3 y ahora con las key 4, 5 y 6 y con esto puede afectar un poco el rendimiento de la aplicación ya que desmonta todo y lo vuelve a montar. En este caso puede ser que sea mejor que las key sean los índices de los elementos del array ya que siempre serán los mismos, se tendría elemento A con key 0, elemento B con key 1, elemento C con key 2, y al ir a la paginación siguiente se tendría elemento D con key 0, elemento E con key 1, elemento F con key 2 y nos puede ayudar un poco al rendimiento ya que reutilizaría la estructura anterior para renderizar los nuevos elementos. Con esto obviamante no funcioanrá lo de memorizar el componente <Item /> y sto se puede utilizar cuando el elemento hijo, en este caso <Item /> no tiene estado interno porque al tener estado interno y al cambiarlo se vuele a renderizar
*/
