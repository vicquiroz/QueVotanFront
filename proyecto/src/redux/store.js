import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import first_Votations_Reducer from './VotacionDucks'
import info_Congressmen_Reducer from './InfoCongDucks'
import Info_Graphic_Reducer from './InfoGrafDucks'
import info_Deputies_Reducer from './InfoDipDucks'
import interven_Congres_Reducer from './IntervenCongresDucks'
import tagsReducer from './TagsDucks'
import preview_Voting_Reducer from './previewVotDucks'
import info_Consult_Reducer from './InfoConsultaDucks'
import by_Matter_Reducer from './busqueda/porMateria'
import by_Id_Reducer from './busqueda/porId'
import by_Boletin_Reducer from './busqueda/porBoletin'
import by_Name_Reducer from './busqueda/porNombre'
import by_Date_Reducer from './busqueda/porFecha'

/* Combining all the reducers into one. */
const rootReducer = combineReducers({
    first_Votations: first_Votations_Reducer,
    info_Congressmen: info_Congressmen_Reducer,
    info_Graphic: Info_Graphic_Reducer,
    tags: tagsReducer,
    info_Deputies: info_Deputies_Reducer,
    interven_Congres: interven_Congres_Reducer,
    preview_Voting: preview_Voting_Reducer,
    info_Consult: info_Consult_Reducer,
    by_Matter: by_Matter_Reducer,
    by_Id: by_Id_Reducer,
    by_Bulletin : by_Boletin_Reducer,
    by_Name : by_Name_Reducer,
    by_Date : by_Date_Reducer
    // En el caso de que se agregen mas, se coloca ,nuevodato :ReductorNuevoDato
})
/**
 * This function creates a Redux store with the rootReducer and the thunk middleware, and returns the
 * store.
 * @returns A function that returns a store.
 */
export default function generateStore() {
    const store = createStore( rootReducer, composeWithDevTools( applyMiddleware(thunk) ) )
    return store
}