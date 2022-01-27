import axios from 'axios'

const porIdI = {
    array: []
}

const OBTENER_PORID_EXITO = 'OBTENER_PORID_EXITO'

export default function porIdReducer(state = porIdI, action){
    switch(action.type){
        case OBTENER_PORID_EXITO:
            return {...state, array: action.payload}
        default:
            return state
    }
}

export const obtenerPorIdAccion = (param) => async(dispatch,getState) => {
    try {
        const res = await axios.get(String(process.env.REACT_APP_API_URL+"votaciones/"+param))
        dispatch({
            type: OBTENER_PORID_EXITO,
            payload: res.data.data
        })
    } catch (error) {
        console.log(error)
    }
}