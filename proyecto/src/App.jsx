import React from "react"
import Prueba from "./pag/pruebaGraf.jsx"
import Barra from "./pag/barra.jsx"
import Tabla from "./pag/tabla.jsx"
import {Container} from "reactstrap"
import 'bootstrap/dist/css/bootstrap.css';

function App() {
  return (
    <Container className="container-fluid" >
    <div className="App">   
        <Barra/>
        <Tabla/>
        <Prueba/>
    </div>
    </Container>
  );
}

export default App;
