import React from "react"
import Principal from "./pag/pagPrincipal.jsx";
import PagGrafico from "./pag/pagGrafico.jsx";
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
      <Container className="container-fluid" >
        <Switch>
          <Route path="/">
            <div>
                <Route path="/" exact component={Principal} />
                  {/* <Provider store={store}>
                        <Votacion/>
                      </Provider>
                  */}
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
      </Container>
    </Router>
  );
}

export default App;
