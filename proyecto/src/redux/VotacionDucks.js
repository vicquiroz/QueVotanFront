import axios from 'axios'
const VotacionI = {
    stateDispatch:false,
    array : []
}


const GETTING_FIRST_VOTES_SUCCESS = 'GETTING_FIRST_VOTES_SUCCESS'
const GET_FIRST_VOTE_ERROR = 'GET_FIRST_VOTE_ERROR'
/**
 * It takes the state and an action as arguments, and returns a new state based on the action type.
 * @param [state] - VotacionI
 * @param action - {type: "GETTING_FIRST_VOTES_SUCCESS", payload: Array(2)}
 * @returns The state is being returned.
 */
export default function first_Votations_Reducer(state = VotacionI, action){
    switch(action.type){
        case GETTING_FIRST_VOTES_SUCCESS:
            return {...state, array: action.payload}
        case GET_FIRST_VOTE_ERROR:
            return {...state, array: action.payload}
        default:
            return state
    }
}
/**
 * Action function that receives a page number for the API call and creates a dispatch with the first 10 votes
 * 
 * The first function is the one that is called when the action is dispatched. It takes in the dispatch
 * function and the getState function as parameters. The dispatch function is used to dispatch the
 * action to the reducer. The getState function is used to get the current state of the application.
 * 
 * The second function is the one that is returned by the first function. It takes in the pag
 * parameter. This parameter is used to make the API call.
 * 
 * The third function is an object that contains
 * the type of the action and the payload. The type is used to identify the action in the reducer. The
 * payload is the data that is sent to the reducer.
 * @param pag - page number
 * @returns Dispatch
 */
export const get_First_Votes_Action = (pag) => async(dispatch,getState) => {
    try {
        //Esta constante debe ser cambiada por su equivalente en API
        const res = await axios.get(String(process.env.REACT_APP_API_URL)+"votaciones?page="+pag+"&limit=10")
        //console.log(res.data.data)
        dispatch({
            type: GETTING_FIRST_VOTES_SUCCESS,
            payload: res.data.data,
            stateDispatch:true
        })
    } catch (error) {
        dispatch({
            type: GET_FIRST_VOTE_ERROR,
            payload: error.toJSON().message
        })
    }
}
