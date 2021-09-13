import axios from 'axios'

// Constantes
const datosIniciales = {
    array : []
}

// Tipos
const OBTENER_DATOS_EXITO = 'OBTENER_DATOS_EXITO'

// Reductor
export default function datosReducer(state = datosIniciales, action){
    switch(action.type){
        case OBTENER_DATOS_EXITO:
            return {...state, array: action.payload}
        default:
            return state
    }
    
}

// Acciones
export const obtenerDatosAccion = () => async(dispatch,getState) => {
    try {
        const res = await axios.get('http://18.119.166.32:8000/historia/ley/')
        dispatch({
            type: OBTENER_DATOS_EXITO,
            payload: res.data
        })
    } catch (error) {
        console.log(error)
    }

}