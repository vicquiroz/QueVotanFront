import axios from 'axios'

const porFechaI = {
    array: []
}



const OBTENER_PORFECHA_EXITO = 'OBTENER_PORFECHA_EXITO'
const OBTENER_PORFECHA_ERROR = 'OBTENER_PORFECHA_ERROR'

/**
 * Reducer del estado al buscar votaciones por fecha.
 * @param {porFechaI} state El estado de l apalicacion.
 * @param {*} action La accion de buscar por fecha, action.type: 'OBTENER_PORFECHA_EXITO' or 'OBTENER_PORFECHA_ERROR'
 * @returns El nuevo estado de la aplicacion.
 */
export default function porFechaReducer(state = porFechaI, action){
    switch(action.type){
        case OBTENER_PORFECHA_EXITO:
            return {...state, array: action.payload}
        case OBTENER_PORFECHA_ERROR:
            return {...state, array: action.payload}
        default:
            return state
    }
}

/**
 * Funcion accion para poder obtener las votaciones segun fecha.
 * @param {*} param Fecha de las votaciones que se estan buscando.
 * @param {number} pag Numero que reprecenta la pagina desde la cual se esta sacando la información e la API
 * @returns Dispatch type:OBTENER_PORFECHA_EXITO payload: data de las votaciones de esa fecha.
 */
export const obtenerPorFechaAccion = (param,pag) => async(dispatch,getState) => {
    try {
        const res = await axios.get(String(process.env.REACT_APP_API_URL+"votaciones/fecha/"+param.split("!")[0]+"/"+param.split("!")[1]+"?page="+pag+"&limit=10"))
        dispatch({
            type: OBTENER_PORFECHA_EXITO,
            payload: res.data.data
        })
    } catch (error) {
        dispatch({
            type: OBTENER_PORFECHA_ERROR,
            payload: error.toJSON().message
        })
    }
}