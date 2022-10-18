import axios from 'axios'

const porNombreI = {
    array: []
}



const OBTENER_PORNOMBRE_EXITO = 'OBTENER_PORNOMBRE_EXITO'
const OBTENER_PORNOMBRE_ERROR = 'OBTENER_PORNOMBRE_ERROR'

/**
 * Reducer para el estado al buscar por nombre.
 * @param {porNombreI} state El estado de la aplicacion.
 * @param {*} action La action.type: 'OBTENER_PORNOMBRE_EXITO' or 'OBTENER_PORNOMBRE_ERROR'
 * @returns El nuevo estado de la aplicacion.
 */
export default function porNombreReducer(state = porNombreI, action){
    switch(action.type){
        case OBTENER_PORNOMBRE_EXITO:
            return {...state, array: action.payload}
        case OBTENER_PORNOMBRE_ERROR:
            return {...state, array: action.payload}
        default:
            return state
    }
}


/**
 * Funcion accion para poder obtener las votaciones segun un nombre nombre PREGUNTAR SI ESTA FUNCION DIBUJA LOS VALORES DE LA BUSQUEDA DEL INICIO O AL ENTRAR EN EL PERFIL DE UN DIPUTADO
 * @param {*} param Nombre ¿VOTACION O DIPUTDO? para buscar
 * @param {number} pag Numero para identificar la pagina donde se sacara la informacion.
 * @returns PREGUNTAR SI ESTA FUNCION DIBUJA LOS VALORES DE LA BUSQUEDA DEL INICIO O AL ENTRAR EN EL PERFIL DE UN DIPUTADO
 */
export const obtenerPorNombreAccion = (param,pag) => async(dispatch,getState) => {
    try {
        const res = await axios.get(String(process.env.REACT_APP_API_URL+"votaciones/nombre/"+param+"?page="+pag+"&limit=10"))
        dispatch({
            type: OBTENER_PORNOMBRE_EXITO,
            payload: res.data.data
        })
    } catch (error) {
        dispatch({
            type: OBTENER_PORNOMBRE_ERROR,
            payload: error.toJSON().message
        })
    }
}