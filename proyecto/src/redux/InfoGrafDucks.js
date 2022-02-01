import axios from 'axios'
const InfoGraficoI = {
    array: {}
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

export const obtenerInfoGraficoAccion = (idWnominate) => async(dispatch,getState) => {
    try {
        const res = await axios.get(String(process.env.REACT_APP_API_URL)+"wnominate/"+idWnominate)
        dispatch({
            type: OBTENER_INFOGRAFICO_EXITO,
            payload: res.data.data
        })
    } catch (error) {
        console.log(error)
    }
}