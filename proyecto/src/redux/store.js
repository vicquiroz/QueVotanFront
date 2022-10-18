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
/**
 * Contiene la combinacion de todos lod Reduceres
 */
const rootReducer = combineReducers({
    first_Votes: primerasVotacionesReducer,
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

/**
 *  funcion que creea la Store de redux la cual contiene todos los reducers combinados permitiendo Middkeware
 * @returns El store del proyecto.
 */
export default function generateStore() {
    const store = createStore( rootReducer, composeWithDevTools( applyMiddleware(thunk) ) )
    return store
}