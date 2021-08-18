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
      <Container className="container-fluid" >
        <Switch>
          <Route path="/">
            <div>
                <Route path="/" exact component={Barra} />
                <Route path="/" exact component={Tabla} />
            </div>
          </Route>
        </Switch>
        <Switch>
          <Route path="/grafico">
            <div>
              <Barra/>   
              <MostrarLista/>
            </div>
          </Route>
        </Switch>
      </Container>
    </Router>
  );
}

export default App;
