import React from "react"
import Principal from "./pag/pagPrincipal.jsx";
import PagGrafico from "./pag/pagGrafico.jsx";
import AcercaDe from "./pag/acercaDe.jsx";
import Congresista from "./pag/pagCong.jsx";
import {Container} from "reactstrap"
import { BrowserRouter as Router, Switch, Route} from "react-router-dom"; 
import 'bootstrap/dist/css/bootstrap.css';
import './resources/bootstrap.min.css'
import './components/estilo.css'
import {Provider} from 'react-redux'
import generateStore from './redux/store'
function App() {
  const store = generateStore()
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
            <Route path="/grafico/:handle" component={PagGrafico}/>
          </Switch>
          <Switch>
            <Route path="/congresista/:handle" component={Congresista}/>
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
