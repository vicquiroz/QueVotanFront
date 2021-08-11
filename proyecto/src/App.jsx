import React from "react"
import Prueba from "./pag/pruebaGraf.jsx"
import Barra from "./pag/barra.jsx"
import Tabla from "./pag/tabla.jsx"
import 'bootstrap/dist/css/bootstrap.css';
function App() {
  return (
    <div className="App">
      <Barra/>
      <Tabla/>
      <Prueba/>

    </div>
  );
}

export default App;
