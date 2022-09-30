import axios from 'axios'

const porMateriaI = {
    array: []
}



const OBTENER_PORMATERIA_EXITO = 'OBTENER_PORMATERIA_EXITO'
const OBTENER_PORMATERIA_ERROR = 'OBTENER_PORMATERIA_ERROR'
/**
 * Reducer para el estado al obtener votaciones por materia.
 * @param {porMateriaI} state El estado de la aplicacion.
 * @param {*} action La action.type: 'OBTENER_PORMATERIA_EXITO' or 'OBTENER_PORMATERIA_ERROR'
 * @returns El nuevo estado de la aplicacion tras obtener con exito o error las votaciones por materia
 */
export default function porMateriaReducer(state = porMateriaI, action){
    switch(action.type){
        case OBTENER_PORMATERIA_EXITO:
            return {...state, array: action.payload}
        case OBTENER_PORMATERIA_ERROR:
            return {...state, array: action.payload}
        default:
            return state
    }
}

/**
 * Funcion accion para obtener por materias las votaciones
 * @param {*} param La materia que se desea buscar.
 * @param {number} pag El numero de pagina en la cual se esta buscado la informacion
 * @returns Dispatch type: OBTENER_PORMATERIA_EXITO payload: data de "votaciones/materia/"+param+"?page="+pag+"&limit=10" or type: OBTENER_PORMATERIA_ERROR payload: error
 */
export const obtenerPorMateriaAccion = (param,pag) => async(dispatch,getState) => {
    try {
        const res = await axios.get(String(process.env.REACT_APP_API_URL+"votaciones/materia/"+param+"?page="+pag+"&limit=10"))
        dispatch({
            type: OBTENER_PORMATERIA_EXITO,
            payload: res.data.data
        })
    } catch (error) {
        dispatch({
            type: OBTENER_PORMATERIA_ERROR,
            payload: error.toJSON().message
        })
    }
}