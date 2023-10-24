import { useRef, useState } from "react";

/* controlar los botones a través de las referencias */
export const MediaPlayerApp = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef();

  const handleVideoState = () => {
    // console.log(videoRef.current);
    isPlaying ? videoRef.current.pause() : videoRef.current.play();

    setIsPlaying(!isPlaying);
  };

  return (
    <div>
      <h1>Media Player App</h1>

      <video
        style={{ cursor: "pointer" }}
        width="300"
        ref={videoRef}
        onClick={handleVideoState}
      >
        {/* para acceder a los archivos públicos (carpeta public) solo se coloca la ruta tal cual. Si se escribe de esa forma la ruta de inicio será "public" */}
        <source src="videos/planet_earth(360p).mp4" type="video/mp4" />
      </video>
      <br />

      {/* si el video se está reproduciendo entonces muestra Pause y si no entonces Play */}
      <button onClick={handleVideoState}>{isPlaying ? "Pause" : "Play"}</button>
    </div>
  );
};
