import { useState, useRef, useEffect } from "react";
import { getPost } from "../helpers/getPost";

/* este uso del useRef() se puede dar por ejemplo cuando se utiliza el react-router-dom y hay varias vistas y si estas vistas tienen alguna llamada a API pero se cambia rápidamente de vistas entonces el useRef() nos solucionaría ese problema */
export const Card = () => {
  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(true);
  /* referencia para saber si el componente está montado o no, y si está montado entonces hacer la petición y si no entonces que no haga nada */
  const isMountedRef = useRef(true);

  /* se coloca el setTimeout() solo para darle un pequeño delay porque la API es muy rápida y solo se usará en este caso a modo de ejemplo simulando que el servidor demora en mandar la data */
  const fetchPost = () => {
    getPost().then((newPost) => {
      setTimeout(() => {
        setLoading(false);
        setPost(newPost);
      }, 2000);
    });
  };

  useEffect(() => {
    if (isMountedRef.current) {
      fetchPost();
      console.log("mounted");
    } else {
      console.log("no mounted");
    }

    /* cuando el componente se desmonta entonces cambiar el valor de la referencia a false */
    return () => {
      isMountedRef.current = false;
      console.log("clean-up");
    };
  }, []);

  if (loading) return <h1>Loading...</h1>;

  return (
    <div>
      <h1>{post.title}</h1>
    </div>
  );
};
