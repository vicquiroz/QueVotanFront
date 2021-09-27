import React from "react"
import Principal from "./pag/pagPrincipal.jsx";
import PagGrafico from "./pag/pagGrafico.jsx";
import AcercaDe from "./pag/acercaDe.jsx";
import {Container} from "reactstrap"
import { BrowserRouter as Router, Switch, Route} from "react-router-dom"; 
import 'bootstrap/dist/css/bootstrap.css';

import {Provider} from 'react-redux'
import generateStore from './redux/store'
import Votacion from './components/Votacion.jsx'
function App() {
  const store = generateStore()
  return (
    <Router>
      <Provider store={store}>
        <Container className="container-fluid" >
          <Switch>
            <Route path="/">
              <div>
                  <Route path="/" exact component={Principal}/>
              </div>
            </Route>
          </Switch>
          <Switch>
            <Route path="/grafico">
              <div> 
                <PagGrafico/>
              </div>
            </Route>
          </Switch>
          <Switch>
            <Route path="/acerca">
              <AcercaDe/>
            </Route>
          </Switch>
        </Container>
      </Provider>
    </Router>
  );
}

export default App;
