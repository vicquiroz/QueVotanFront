import axios from 'axios'
const VotacionI = {
    stateDispatch:false,
    array : []
}

const OBTENER_PRIMERASVOTACIONES_EXITO = 'OBTENER_PRIMERASVOTACIONES_EXITO'
const OBTENER_PRIMERASVOTACIONES_ERROR = 'OBTENER_PRIMERASVOTACIONES_ERROR'

export default function primerasVotacionesReducer(state = VotacionI, action){
    switch(action.type){
        case OBTENER_PRIMERASVOTACIONES_EXITO:
            return {...state, array: action.payload}
        case OBTENER_PRIMERASVOTACIONES_ERROR:
            return {...state, array: action.payload}
        default:
            return state
    }
}

export const obtenerPrimerasVotacionesAccion = (pag) => async(dispatch,getState) => {
    try {
        //Esta constante debe ser cambiada por su equivalente en API
        const res = await axios.get(String(process.env.REACT_APP_API_URL)+"votaciones?page="+pag+"&limit=10")
        //console.log(res.data.data)
        dispatch({
            type: OBTENER_PRIMERASVOTACIONES_EXITO,
            payload: res.data.data,
            stateDispatch:true
        })
    } catch (error) {
        dispatch({
            type: OBTENER_PRIMERASVOTACIONES_ERROR,
            payload: error.toJSON().message
        })
    }
}
