import axios from 'axios'
const VotacionI = {
    stateDispatch:false,
    array : []
}

const OBTENER_PRIMERASVOTACIONES_EXITO = 'OBTENER_PRIMERASVOTACIONES_EXITO'

export default function primerasVotacionesReducer(state = VotacionI, action){
    switch(action.type){
        case OBTENER_PRIMERASVOTACIONES_EXITO:
            return {...state, array: action.payload}
        default:
            return state
    }
}

export const obtenerPrimerasVotacionesAccion = () => async(dispatch,getState) => {
    try {
        //Esta constante debe ser cambiada por su equivalente en API
        const res = await axios.get(String(process.env.REACT_APP_API_URL)+"votaciones")
        dispatch({
            type: OBTENER_PRIMERASVOTACIONES_EXITO,
            payload: res.data.data,
            stateDispatch:true
        })
    } catch (error) {
        console.log(error)
    }
}
