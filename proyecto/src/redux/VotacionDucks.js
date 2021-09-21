import axios from 'axios'

const VotacionI = {
    array : []
}

const OBTENER_VOTACION_EXITO = 'OBTENER_VOTACION_EXITO'

export default function votacionReducer(state = VotacionI, action){
    switch(action.type){
        case OBTENER_VOTACION_EXITO:
            return {...state, array: action.payload}
        default:
            return state
    }
}

export const obtenerVotacionAccion = () => async(dispatch,getState) => {
    try {
        //Esta constante debe ser cambiada por su equivalente en API
        const res = await axios.get(String(process.env.REACT_APP_API_URL))
        console.log(res)
        dispatch({
            type: OBTENER_VOTACION_EXITO,
            payload: res.data
        })
    } catch (error) {
        console.log(error)
    }
}
