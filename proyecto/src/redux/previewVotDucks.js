import axios from 'axios'

const previewVotacionI = {
    array: []
}

const OBTENER_PREVIEWVOTACION_EXITO = 'OBTENER_PREVIEWVOTACION_EXITO'

export default function previewVotacionReducer(state = previewVotacionI, action){
    switch(action.type){
        case OBTENER_PREVIEWVOTACION_EXITO:
            return {...state, array: action.payload}
        default:
            return state
    }
}

export const obtenerPreviewVotacionAccion = (idVot) => async(dispatch,getState) => {
    try {
        const res = await axios.get(String(process.env.REACT_APP_API_URL)+"wnominate/diputados/preview/"+idVot)
        dispatch({
            type: OBTENER_PREVIEWVOTACION_EXITO,
            payload: res.data
        })
    } catch (error) {
        console.log(error)
    }
}