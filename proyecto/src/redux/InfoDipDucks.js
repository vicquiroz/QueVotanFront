import axios from 'axios'

const InfoDiputadosI = {
    array: []
}

const OBTENER_INFODIPUTADOS_EXITO = 'OBTENER_INFODIPUTADOS_EXITO'

export default function infoDiputadosReducer(state = InfoDiputadosI, action){
    switch(action.type){
        case OBTENER_INFODIPUTADOS_EXITO:
            return {...state, array: action.payload}
        default:
            return state
    }
}

export const obtenerInfoDiputadosAccion = (IdDiputado) => async(dispatch,getState) => {
    try {
        const res = await axios.get(String(process.env.REACT_APP_API_URL+"parlamentario/"+IdDiputado))
        dispatch({
            type: OBTENER_INFODIPUTADOS_EXITO,
            payload: res.data.data
        })
    } catch (error) {
        console.log(error)
    }
}