import axios from 'axios'

const InfoCongresistasI = {
    array: []
}

const OBTENER_INFOCONGRESISTAS_EXITO = 'OBTENER_INFOCONGRESISTAS_EXITO'

export default function infoCongresistasReducer(state = InfoCongresistasI, action){
    switch(action.type){
        case OBTENER_INFOCONGRESISTAS_EXITO:
            return {...state, array: action.payload}
        default:
            return state
    }
}

export const obtenerInfoCongresistasAccion = () => async(dispatch,getState) => {
    try {
        //Esta constante debe ser cambiada por su equivalente en API
        const res = await axios.get('http://18.119.166.32:8000/')
        dispatch({
            type: OBTENER_INFOCONGRESISTAS_EXITO,
            payload: res.data
        })
    } catch (error) {
        console.log(error)
    }
}