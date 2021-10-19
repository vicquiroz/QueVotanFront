import axios from 'axios'

const InfoConsultasI = {
    array: []
}

const OBTENER_INFOCONSULTA_EXITO = 'OBTENER_INFOCONSULTA_EXITO'

export default function infoConsultaReducer(state = InfoConsultasI, action){
    switch(action.type){
        case OBTENER_INFOCONSULTA_EXITO:
            return {...state, array: action.payload}
        default:
            return state
    }
}

export const obtenerInfoConsultaAccion = (Tipo,Valor) => async(dispatch,getState) => {
    console.log(Tipo)
    console.log(Valor)
    try {
        const res = await axios.get(String(process.env.REACT_APP_API_URL+"wnominate/diputados/preview/teste/"+Tipo+"/"+Valor))
        dispatch({
            type: OBTENER_INFOCONSULTA_EXITO,
            payload: res.data
        })
    } catch (error) {
        console.log(error)
    }
}