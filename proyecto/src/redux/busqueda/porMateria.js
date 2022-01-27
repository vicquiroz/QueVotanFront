import axios from 'axios'

const porMateriaI = {
    array: []
}

const OBTENER_PORMATERIA_EXITO = 'OBTENER_PORMATERIA_EXITO'

export default function porMateriaReducer(state = porMateriaI, action){
    switch(action.type){
        case OBTENER_PORMATERIA_EXITO:
            return {...state, array: action.payload}
        default:
            return state
    }
}

export const obtenerPorMateriaAccion = (param,pag) => async(dispatch,getState) => {
    try {
        const res = await axios.get(String(process.env.REACT_APP_API_URL+"votaciones/materia/"+param+"?page="+pag+"&limit=10"))
        dispatch({
            type: OBTENER_PORMATERIA_EXITO,
            payload: res.data.data
        })
    } catch (error) {
        console.log(error)
    }
}