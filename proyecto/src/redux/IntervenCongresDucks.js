import axios from 'axios'

const IntervenCongresI = {
    array: []
}

const OBTENER_INTERVENCONGRES_EXITO = 'OBTENER_INTERVENCONGRES_EXITO'

export default function intervenCongresReducer(state = IntervenCongresI, action){
    switch(action.type){
        case OBTENER_INTERVENCONGRES_EXITO:
            return {...state, array: action.payload}
        default:
            return state
    }
}

export const obtenerIntervenCongresAccion = (IdCongres) => async(dispatch,getState) => {
    try {
        const res = await axios.get(String(process.env.REACT_APP_API_URL+"proyectos/parpatrocinante/"+IdCongres))
        dispatch({
            type: OBTENER_INTERVENCONGRES_EXITO,
            payload: res.data
        })
    } catch (error) {
        console.log(error)
    }
}