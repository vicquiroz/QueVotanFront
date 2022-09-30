import axios from 'axios'
const VotacionI = {
    stateDispatch:false,
    array : []
}


const OBTENER_PRIMERASVOTACIONES_EXITO = 'OBTENER_PRIMERASVOTACIONES_EXITO'
const OBTENER_PRIMERASVOTACIONES_ERROR = 'OBTENER_PRIMERASVOTACIONES_ERROR'
/**
 * Reducer para cambiar el estado segun el exito o error de la accion Obtener_PriemrosVotos
 * @param {VotacionI} state Recibe por defecto un VotacionI con stateDispatch false y un array  
 * @param {OBTENER_PRIMERASVOTACIONES_EXITO|OBTENER_PRIMERASVOTACIONES_ERROR} action action.type = OBTENER_PRIMERASVOTACIONES_EXITO' o 'OBTENER_PRIMERASVOTACIONES_ERROR'
 * @returns El nuevo estado dependiendo del exito o error al "OBTENER_PRIMERASVOTACIONES"
 */
export default function primerasVotacionesReducer(state = VotacionI, action){
    switch(action.type){
        case OBTENER_PRIMERASVOTACIONES_EXITO:
            return {...state, array: action.payload}
        case OBTENER_PRIMERASVOTACIONES_ERROR:
            return {...state, array: action.payload}
        default:
            return state
    }
}
/**
 * Funcion Accion que recibe un numero de pagiana para revisar en la API y asi por dentro crear un dispatch
 * @param {number} pag Reprecenta el numero de la pagina de la cual se busca la informacion.
 * @returns Dispatch con el type: OBTENER_PRIMERASVOTACIONES_EXITO,payload: data de "votaciones?page="+pag+"&limit=10" ,stateDispatch:true y si falla type: OBTENER_PRIMERASVOTACIONES_ERROR, payload: error.toJSON().message
 */
export const obtenerPrimerasVotacionesAccion = (pag) => async(dispatch,getState) => {
    try {
        //Esta constante debe ser cambiada por su equivalente en API
        const res = await axios.get(String(process.env.REACT_APP_API_URL)+"votaciones?page="+pag+"&limit=10")
        //console.log(res.data.data)
        dispatch({
            type: OBTENER_PRIMERASVOTACIONES_EXITO,
            payload: res.data.data,
            stateDispatch:true
        })
    } catch (error) {
        dispatch({
            type: OBTENER_PRIMERASVOTACIONES_ERROR,
            payload: error.toJSON().message
        })
    }
}
