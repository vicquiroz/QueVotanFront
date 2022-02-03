import axios from 'axios'

const porNombreI = {
    array: []
}

const OBTENER_PORNOMBRE_EXITO = 'OBTENER_PORNOMBRE_EXITO'
const OBTENER_PORNOMBRE_ERROR = 'OBTENER_PORNOMBRE_ERROR'

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

export const obtenerPorNombreAccion = (param,pag) => async(dispatch,getState) => {
    try {
        const res = await axios.get(String(process.env.REACT_APP_API_URL+"votaciones/nombre/"+param+"?page="+pag+"&limit=10"))
        dispatch({
            type: OBTENER_PORNOMBRE_EXITO,
            payload: res.data.data
        })
    } catch (error) {
        console.log(error)
        dispatch({
            type: OBTENER_PORNOMBRE_ERROR,
            payload: error
        })
    }
}