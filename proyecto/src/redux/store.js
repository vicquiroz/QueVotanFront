import { createContextStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from 'redux-thunk'

import ReductorDatos from "./DatosDucks";

const rootReducer = combineReducers({
    datos: ReductorDatos
    // En el caso de que se agregen mas, se coloca ,nuevodato :ReductorNuevoDato
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE_ || compose;

export default function generateStore(){
    const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))
    return store;
}