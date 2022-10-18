import React from "react"
import Principal from "./pag/pagPrincipal.jsx";
import PagGrafico from "./pag/pagGrafico.jsx";
import AcercaDe from "./pag/acercaDe.jsx";
import Congresista from "./pag/pagCong.jsx";
import Buscar from './pag/pagBusqueda'
import VotacionesImportantes from "./pag/votImportantes.jsx";
import {Container} from "reactstrap"
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import './resources/bootstrap.min.css'
import './components/estilo.css'
import {Provider} from 'react-redux'
import generateStore from './redux/store'
function App() {
  const store = generateStore()
  /*if (process.env.NODE_ENV === "development"){
    console.log = () => {};
    console.warn = () => {};
    console.error = () => {};
    console.debug = () => {};
    console.exception = () =>{};
    console.info = () => {};
  }*/
  //console.log(process.env.NODE_ENV);
  return (
    <div className='Login-component'>
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
            <Route path="/Buscar/:handleMetodo/:handle_Value" exact component={Buscar}/>
          </Switch>
          <Switch>
            <Route path="/VotacionesImportantes/:handleMetodo/:handle_Value" exact component={VotacionesImportantes}/>
          </Switch>
          <Switch>
            <Route path="/grafico/:handle" component={PagGrafico}/>
          </Switch>
          <Switch>
            <Route path="/congresista/:handleIdDip/:handleIdVot" component={Congresista}/>
          </Switch>
          <Switch>
            <Route path="/acerca" component={AcercaDe}/>
          </Switch>
        </Container>
      </Provider>
    </Router>
    </div>
  );
}

export default App;
