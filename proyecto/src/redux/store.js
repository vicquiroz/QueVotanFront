import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'

import primerasVotacionesReducer from './VotacionDucks'
import infoCongresistasReducer from './InfoCongDucks'
import infoGraficoReducer from './InfoGrafDucks'
import infoDiputadosReducer from './InfoDipDucks'
import intervenCongresReducer from './IntervenCongresDucks'
import tagsReducer from './TagsDucks'
import previewVotacionReducer from './previewVotDucks'
import infoConsultaReducer from './InfoConsultaDucks'
import porMateriaReducer from './busqueda/porMateria'
import porIdReducer from './busqueda/porId'
import porBoletinReducer from './busqueda/porBoletin'
import porNombreReducer from './busqueda/porNombre'
import porFechaReducer from './busqueda/porFecha'
const rootReducer = combineReducers({
    primerasVotaciones: primerasVotacionesReducer,
    infoCongresistas: infoCongresistasReducer,
    infoGrafico: infoGraficoReducer,
    tags: tagsReducer,
    infoDiputados: infoDiputadosReducer,
    intervenCongres: intervenCongresReducer,
    previewVotacion: previewVotacionReducer,
    infoConsulta: infoConsultaReducer,
    porMateria: porMateriaReducer,
    porId: porIdReducer,
    porBoletin : porBoletinReducer,
    porNombre : porNombreReducer,
    porFecha : porFechaReducer
    // En el caso de que se agregen mas, se coloca ,nuevodato :ReductorNuevoDato
})

export default function generateStore() {
    const store = createStore( rootReducer, composeWithDevTools( applyMiddleware(thunk) ) )
    return store
}