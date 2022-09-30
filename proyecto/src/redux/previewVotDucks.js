import axios from 'axios'

const previewVotacionI = {
    array: []
}


const OBTENER_PREVIEWVOTACION_EXITO = 'OBTENER_PREVIEWVOTACION_EXITO'

/**
 * Reducer para actualizar el estado al obtemer preview de las votaciones
 * @param {previewVotacionI} state El estado de la aplicacion.
 * @param {OBTENER_PREVIEWVOTACION_EXITO} action un action.type: 'OBTENER_PREVIEWVOTACION_EXITO'
 * @returns El nuevo estado de la aplicacion.
 */
export default function previewVotacionReducer(state = previewVotacionI, action){
    switch(action.type){
        case OBTENER_PREVIEWVOTACION_EXITO:
            return {...state, array: action.payload}
        default:
            return state
    }
}
/**
 * Funcion accion para obtener lista de las votaciones segun un ID de un votante
 * @param {} idVot id de un votante para entregarlo a la API
 * @returns {dispatch} Dispatch con type: 'OBTENER_PREVIEWVOTACION_EXITO' payload: res.data de "wnominate/diputados/preview/"+idVot
 */
export const obtenerPreviewVotacionAccion = (idVot) => async(dispatch,getState) => {
    try {
        const res = await axios.get(String(process.env.REACT_APP_API_URL)+"wnominate/diputados/preview/"+idVot)
        dispatch({
            type: OBTENER_PREVIEWVOTACION_EXITO,
            payload: res.data
        })
    } catch (error) {
        console.log(error)
    }
}