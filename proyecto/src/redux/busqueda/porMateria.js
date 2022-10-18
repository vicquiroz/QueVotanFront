import axios from 'axios'

const porMateriaI = {
    array: []
}



const GET_BY_MATTER_SUCCESS = 'GET_BY_MATTER_SUCCESS'
const GET_BY_MATTER_ERROR = 'GET_BY_MATTER_ERROR'
/**
 * It returns a new state object with the array property set to the value of the action.payload
 * property.
 * @param [state] - porMateriaI
 * @param action - {type: "GET_BY_MATTER_SUCCESS", payload: Array()}
 * @returns The state is being returned.
 */
export default function by_Matter_Reducer(state = porMateriaI, action){
    switch(action.type){
        case GET_BY_MATTER_SUCCESS:
            return {...state, array: action.payload}
        case GET_BY_MATTER_ERROR:
            return {...state, array: action.payload}
        default:
            return state
    }
}
/**
 * Function that occupies the parameter "param" and "pag" to obtain the votes according to a selected matter.
 * 
 * The type property is a string that is used to identify the action.
 * 
 * The payload property is the data that is passed to the reducer.
 * 
 * @param param - is the subject that I want to filter
 * @param pag - page number
 */
export const get_By_Matter_Action = (param,pag) => async(dispatch,getState) => {
    try {
        const res = await axios.get(String(process.env.REACT_APP_API_URL+"votaciones/materia/"+param+"?page="+pag+"&limit=10"))
        dispatch({
            type: GET_BY_MATTER_SUCCESS,
            payload: res.data.data
        })
    } catch (error) {
        dispatch({
            type: GET_BY_MATTER_ERROR,
            payload: error.toJSON().message
        })
    }
}