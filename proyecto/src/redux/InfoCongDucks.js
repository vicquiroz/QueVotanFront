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
        const res = await axios.get(String(process.env.REACT_APP_API_URL))
        dispatch({
            type: OBTENER_INFOCONGRESISTAS_EXITO,
            payload: res.data
        })
    } catch (error) {
        console.log(error)
    }
}