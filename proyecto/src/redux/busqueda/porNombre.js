import axios from 'axios'

const porNombreI = {
    array: []
}



const GET_SUCCESS_NAME = 'GET_SUCCESS_NAME'
const GET_BY_NAME_ERROR = 'GET_BY_NAME_ERROR'

/**
 * It takes the state and an action and returns a new state.
 * @param [state] - porNombreI
 * @param action - {type: "GET_SUCCESS_NAME", payload: Array()}
 * @returns The state is being returned.
 */
export default function by_Name_Reducer(state = porNombreI, action){
    switch(action.type){
        case GET_SUCCESS_NAME:
            return {...state, array: action.payload}
        case GET_BY_NAME_ERROR:
            return {...state, array: action.payload}
        default:
            return state
    }
}
/**
 * Action function to be able to obtain the votes according to a name
 * 
 * The dispatch function is used to dispatch the action to the reducer. The
 * getState function is used to get the current state of the application.
 * 
 * It is an object that contains 
 * the type of the action and the payload. The type is used to identify the action in the reducer. The
 * payload is the data that is sent to the reducer.
 * 
 * @param param - is the name of the vote
 * @param pag - page number
 */
export const get_By_Name_Action = (param,pag) => async(dispatch,getState) => {
    try {
        const res = await axios.get(String(process.env.REACT_APP_API_URL+"votaciones/nombre/"+param+"?page="+pag+"&limit=10"))
        dispatch({
            type: GET_SUCCESS_NAME,
            payload: res.data.data
        })
    } catch (error) {
        dispatch({
            type: GET_BY_NAME_ERROR,
            payload: error.toJSON().message
        })
    }
}