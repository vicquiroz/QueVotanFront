import axios from 'axios'

const porFechaI = {
    array: []
}

const OBTENER_PORFECHA_EXITO = 'OBTENER_PORFECHA_EXITO'

export default function porFechaReducer(state = porFechaI, action){
    switch(action.type){
        case OBTENER_PORFECHA_EXITO:
            return {...state, array: action.payload}
        default:
            return state
    }
}

export const obtenerPorFechaAccion = (param,pag) => async(dispatch,getState) => {
    try {
        const res = await axios.get(String(process.env.REACT_APP_API_URL+"votaciones/fecha/"+param.split("!")[0]+"/"+param.split("!")[1]+"?page="+pag+"&limit=10"))
        dispatch({
            type: OBTENER_PORFECHA_EXITO,
            payload: res.data.data
        })
    } catch (error) {
        console.log(error)
    }
}