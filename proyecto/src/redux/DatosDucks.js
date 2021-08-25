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
        //const res = await axios.get('http://18.119.166.32:8000/diputados')

        const testURL = 'http://18.119.166.32:8000/diputados';
        //const testURL = 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=20'
        const myInit = {
            method: 'GET'
            ,mode: 'no-cors',
        };
        const myRequest = new Request(testURL, myInit);
        const response = await fetch(myRequest)
        const res = await response
        console.log(res)

        dispatch({
            type: OBTENER_DATOS_EXITO,
            payload: res.response
        })
    } catch (error) {
        console.log(error)
    }

}