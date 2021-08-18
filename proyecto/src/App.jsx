import React from "react"
import Barra from "./pag/barra.jsx"
import Tabla from "./pag/tabla.jsx"
import MostrarLista from "./pag/listado.jsx"
import {Container} from "reactstrap"
import { BrowserRouter as Router, Switch, Route} from "react-router-dom"; 
import 'bootstrap/dist/css/bootstrap.css';

function App() {
  return (
    <Router>
      <Switch>
        <Container className="container-fluid" >
          <Route path="/">
            <div>
              <Route path="/" exact component={Barra} />
              <Route path="/" exact component={Tabla} />
            </div>
          </Route>
          <Route path="/grafico">
            <div>
              <Barra/>   
              <MostrarLista/>
            </div>
          </Route>
        </Container>
      </Switch>
    </Router>
  );
}

export default App;
