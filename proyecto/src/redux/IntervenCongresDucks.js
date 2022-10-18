import axios from 'axios'

const IntervenCongresI = {
    array: []
}



const OBTENER_INTERVENCONGRES_EXITO = 'OBTENER_INTERVENCONGRES_EXITO'
/**
 * Reducer para el nuevo estado al obtener el patrocinante
 * @param {IntervenCongresI} state el estado de la aplicacion. por defecto un arreglo vacio.
 * @param {*} action action.type: 'OBTENER_INTERVENCONGRES_EXITO'
 * @returns El nuevo estado de la aplicacaion.
 */
export default function intervenCongresReducer(state = IntervenCongresI, action){
    switch(action.type){
        case OBTENER_INTERVENCONGRES_EXITO:
            return {...state, array: action.payload}
        default:
            return state
    }
}

/**
 * Funcion acction para obtener el patrocinante.
 * @param {*} IdCongres identificador del mienbro,
 * @returns Dispatch con el type 'OBTENER_INTERVENCONGRES_EXITO' y el payload: con la data de "proyectos/parpatrocinante/"+IdCongres.
 */
export const obtenerIntervenCongresAccion = (IdCongres) => async(dispatch,getState) => {
    try {
        const res = await axios.get(String(process.env.REACT_APP_API_URL+"proyectos/parpatrocinante/"+IdCongres))
        dispatch({
            type: OBTENER_INTERVENCONGRES_EXITO,
            payload: res.data
        })
    } catch (error) {
        console.log(error)
    }
}