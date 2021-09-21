import axios from 'axios'

const InfoGraficoI = {
    array: []
}

const OBTENER_INFOGRAFICO_EXITO = 'OBTENER_INFOGRAFICO_EXITO'

export default function infoGraficoReducer(state = InfoGraficoI, action){
    switch(action.type){
        case OBTENER_INFOGRAFICO_EXITO:
            return {...state, array: action.payload}
        default:
            return state
    }
}

export const obtenerInfoGraficoAccion = () => async(dispatch,getState) => {
    try {
        //Esta constante debe ser cambiada por su equivalente en API
        const res = await axios.get(String(process.env.REACT_APP_API_URL))
        dispatch({
            type: OBTENER_INFOGRAFICO_EXITO,
            payload: res.data
        })
    } catch (error) {
        console.log(error)
    }
}