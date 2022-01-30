import axios from 'axios'

const porBoletinI = {
    array: []
}

const OBTENER_PORBOLETIN_EXITO = 'OBTENER_PORBOLETIN_EXITO'

export default function porBoletinReducer(state = porBoletinI, action){
    switch(action.type){
        case OBTENER_PORBOLETIN_EXITO:
            return {...state, array: action.payload}
        default:
            return state
    }
}

export const obtenerPorBoletinAccion = (param,pag) => async(dispatch,getState) => {
    try {
        const res = await axios.get(String(process.env.REACT_APP_API_URL+"votaciones/boletin/"+param+"?page="+pag+"&limit=10"))
        dispatch({
            type: OBTENER_PORBOLETIN_EXITO,
            payload: res.data.data
        })
    } catch (error) {
        console.log(error)
    }
}