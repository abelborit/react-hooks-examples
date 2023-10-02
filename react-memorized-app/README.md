# Proyecto usando useCallback() - React.memo() - useMemo()

- ### Hook React.memo() o memo():

  - Evitar renderizaciones innecesarias memorizando componentes
  - Vuelve a memorizar el componente cuando sus props cambian
  - Es recomendable usar cuando:
    - Se usan listas que tienen bastantes elementos
    - Cuando el componente llama a una API y queremos evitar que se manda a llamar innecesariamente por renderizaciones no tanto del componente como tal sino por renderizaciones de su componente padre

- ### Hook useCallback():

  - Memoriza la definición de una función para no volver a definirla en cada renderizado
  - Se puede usar cuando:
    - Usarlo siempre que se pasen las funciones como props a componentes hijos memorizados
    - Usarlo siempre que se pase una función como dependencia en un useEffect()

- ### Hook useMemo():

  - Memoriza propiedades computadas (funciones que retornan un valor), es decir, memoriza un valor calculado
  - Se puede usar para procesos pesados que retornan un valor/valores

---

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
