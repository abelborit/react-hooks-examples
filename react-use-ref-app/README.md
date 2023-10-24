# Proyecto usando useRef()

Lo recomendable del uso del useRef() es usarlo solo cuando se necesite, es decir, por ejemplo si el problema puede ser resuelto solo con estados entonces es mejor usar estados para mantener el ciclo de vida de React y la aplicación pueda ser facilmente predecible para lo que estamos desarrollando y no se vuelve más dificil analizar qué está sucediendo y también para aprovecar el Virtual DOM de React y la aplicación sea lo rápido que se espera

- ### Hook useRef():

  El useRef() tiene básicamente dos usos:

  - Interacción con del DOM Real:

    - Todo lo que se hace con React tiene una interacción en el Virtual DOM y esos resultados se renderizan después en el DOM Real pero con el useRef() podemos interactuar directamente con el DOM Real sin pasar por el DOM Virtual.

  - Referencia mutable:

    - Se usará como una variable que se tendrá en React la cual será persistente a lo largo de las renderizaciones del componente como el useState pero a diferencia de los estados es que estas al cambiar no causan una nueva renderización.

  - Cuando se quiera usar una referencia pero para atrapar un componente de React (no un elemento del DOM) entonces no solo se usa el useRef() como lo haríamos habitualmente porque nos dará un error en consola: `Warning: Function components cannot be given refs. Attempts to access this ref will fail. Did you mean to use React.forwardRef()?` Entonces también se tiene que envolver el componente donde se usará la referencia con el forwardRef() y con eso ya se le puede pasar la ref como propiedad.
    - Tener en consideración que se está usando también el useImperativeHandle() que nos ayuda a definir funciones en un componente que se puede invocar fuera del componente y no va a cambiar su valor a menos que se le indique en las dependencias.

---

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
