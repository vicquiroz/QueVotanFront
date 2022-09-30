import axios from 'axios'

const porIdI = {
    array: []
}



const OBTENER_PORID_EXITO = 'OBTENER_PORID_EXITO'

/**
 * Reducer del estado al buscar votacion por ID
 * @param {porIdI} state El estado de la aplicacion
 * @param {*} action La action.type: 'OBTENER_PORID_EXITO'
 * @returns El nuevo estado de la palicacion tras buscar votaciones por ID
 */
export default function porIdReducer(state = porIdI, action){
    switch(action.type){
        case OBTENER_PORID_EXITO:
            return {...state, array: action.payload}
        default:
            return state
    }
}

/**
 * Funcion accion para buscar votaciones segun un ID
 * @param {*} param La ID a buscar
 * @returns Dispatch con la data de la votacion perteneciente a ese ID "votacion/"+param
 */
export const obtenerPorIdAccion = (param) => async(dispatch,getState) => {
    try {
        const res = await axios.get(String(process.env.REACT_APP_API_URL+"votacion/"+param))
        dispatch({
            type: OBTENER_PORID_EXITO,
            payload: [res.data.data]
        })
    } catch (error) {
        console.log(error)
    }
}