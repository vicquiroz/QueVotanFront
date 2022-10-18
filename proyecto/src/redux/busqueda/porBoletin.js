import axios from 'axios'

const porBoletinI = {
    array: []
}

//Flujo!!!
//Desde un componente se llamara una funcion dispatch() con un Accion como parametro.
// La Accion va a consumir la API, si no falla, se genera el dispatch con un type, lo que activa el switch.
//Se genera el return del Reducer actualizando el array del estado con el payload.
//

const GET_BY_BULLETIN_SUCCESS = 'GET_BY_BULLETIN_SUCCESS'
const GET_BY_BULLETIN_ERROR = 'GET_BY_BULLETIN_ERROR'
/**
 * It returns a new state object with the array property set to the value of the action.payload
 * property.
 * @param [state] - porBoletinI
 * @param action - {type: "GET_BY_BULLETIN_SUCCESS", payload: Array(1)}
 * @returns The state is being returned.
 */
export default function by_Boletin_Reducer(state = porBoletinI, action){
    switch(action.type){
        case GET_BY_BULLETIN_SUCCESS:
            return {...state, array: action.payload}
        case GET_BY_BULLETIN_ERROR:
            return {...state, array: action.payload}
        default:
            return state
    }
}

/**
 * Function that receives two parameters, the newsletter number and the page to refer to in the API URL
 * @param param - is the id of the bulletin
 * @param pag - page number
 */
export const get_By_Bulletin_Action = (param,pag) => async(dispatch,getState) => {
    try {
        const res = await axios.get(String(process.env.REACT_APP_API_URL+"votaciones/boletin/"+param+"?page="+pag+"&limit=10"))
        dispatch({
            type: GET_BY_BULLETIN_SUCCESS,
            payload: res.data.data
        })
    } catch (error) {
        dispatch({
            type: GET_BY_BULLETIN_ERROR,
            payload: error.toJSON().message
        })
    }
}