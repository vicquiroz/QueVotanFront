import axios from 'axios'

const porBoletinI = {
    array: []
}

//Flujo!!!
//Desde un componente se llamara una funcion dispatch() con un Accion como parametro.
// La Accion va a consumir la API, si no falla, se genera el dispatch con un type, lo que activa el switch.
//Se genera el return del Reducer actualizando el array del estado con el payload.
//

const OBTENER_PORBOLETIN_EXITO = 'OBTENER_PORBOLETIN_EXITO'
const OBTENER_PORBOLETIN_ERROR = 'OBTENER_PORBOLETIN_ERROR'
/**
 * Reducer del estado al buscar por numero de boletín
 * @param {porBoletinI} state Estado de la aplicacion.
 * @param {*} action La accion de la aplicacion action.type: 'OBTENER_PORBOLETIN_EXITO' or 'OBTENER_PORBOLETIN_ERROR'
 * @returns El nuevo estado de la aplicacion.
 */
export default function porBoletinReducer(state = porBoletinI, action){
    switch(action.type){
        case OBTENER_PORBOLETIN_EXITO:
            return {...state, array: action.payload}
        case OBTENER_PORBOLETIN_ERROR:
            return {...state, array: action.payload}
        default:
            return state
    }
}

/**
 * Funcion accion al obtener las votaciones segun numero de boletín.
 * @param {*} param El numero del boletín.
 * @param {number} pag El numero de la pagina donde se buscara la información en la API.
 * @returns Dispatch con type:OBTENER_PORBOLETIN_EXITO payload: data de votaciones/boletin/"+param+"?page="+pag+"&limit=10"
 */
export const obtenerPorBoletinAccion = (param,pag) => async(dispatch,getState) => {
    try {
        const res = await axios.get(String(process.env.REACT_APP_API_URL+"votaciones/boletin/"+param+"?page="+pag+"&limit=10"))
        dispatch({
            type: OBTENER_PORBOLETIN_EXITO,
            payload: res.data.data
        })
    } catch (error) {
        dispatch({
            type: OBTENER_PORBOLETIN_ERROR,
            payload: error.toJSON().message
        })
    }
}