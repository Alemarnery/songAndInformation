import React, { useEffect, useState } from "react";
import Formulario from "./Components/Formulario";
import Cancion from "./Components/Cancion";

import axios from "axios";

function App() {
  const [busquedaletra, guardarBusquedaLetra] = useState({});
  const [letra, guardarLetra] = useState("");

  useEffect(() => {
    if (Object.keys(busquedaletra).length === 0) return;

    const consultarApiLetra = async () => {
      const { artista, cancion } = busquedaletra;
      const url = `https://api.lyrics.ovh/v1/${artista}/${cancion}`;

      const resultado = await axios.get(url);
      guardarLetra(resultado.data.lyrics);
    };

    consultarApiLetra();
  }, [busquedaletra]);
  return (
    <>
      <Formulario guardarBusquedaLetra={guardarBusquedaLetra} />

      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6">
            <Cancion letra={letra} />
          </div>

          <div className="col-md-6"></div>
        </div>
      </div>
    </>
  );
}

export default App;
