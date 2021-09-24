import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'

import votacionReducer from './VotacionDucks'
import infoCongresistasReducer from './InfoCongDucks'
import infoGraficoReducer from './InfoGrafDucks'
import infoDiputadosReducer from './InfoDipDucks'
import tagsReducer from './TagsDucks'

const rootReducer = combineReducers({
    votacion: votacionReducer,
    infoCongresistas: infoCongresistasReducer,
    infoGrafico: infoGraficoReducer,
    tags: tagsReducer,
    infoDiputados: infoDiputadosReducer
    // En el caso de que se agregen mas, se coloca ,nuevodato :ReductorNuevoDato
})

export default function generateStore() {
    const store = createStore( rootReducer, composeWithDevTools( applyMiddleware(thunk) ) )
    return store
}