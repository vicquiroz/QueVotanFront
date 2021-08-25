import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'

import datosReducer from './datosDucks'

const rootReducer = combineReducers({
    datos: datosReducer
    // En el caso de que se agregen mas, se coloca ,nuevodato :ReductorNuevoDato
})

export default function generateStore() {
    const store = createStore( rootReducer, composeWithDevTools( applyMiddleware(thunk) ) )
    return store
}