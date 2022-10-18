import axios from 'axios'

const previewVotacionI = {
    array: []
}


const GET_PREVIEWVOTE_SUCCESS = 'GET_PREVIEWVOTE_SUCCESS'

/**
 * It takes a state and an action and returns a new state.
 * @param [state] - previewVotacionI
 * @param action - {type: "GET_PREVIEWVOTE_SUCCESS", payload: Array(1)}
 * @returns The state of the reducer.
 */
export default function preview_Voting_Reducer(state = previewVotacionI, action){
    switch(action.type){
        case GET_PREVIEWVOTE_SUCCESS:
            return {...state, array: action.payload}
        default:
            return state
    }
}
/**
 * The first function is the one that is called when the action is dispatched. It takes two parameters:
 * dispatch and getState. 
 * The object is the one that is returned by the second function. It has two properties: type and
 * payload.
 * The type property is a string that is used to identify the action.
 * The payload property is the data that is sent to the reducer.
 * 
 * The reducer is the function that is called when the action is dispatched. It takes two parameters:
 * state and action.
 * 
 * The state parameter is the current state of the application.
 * 
 * The action parameter is the object that is returned by the action creator.
 * @param idVot - the id of the vote
 * @returns Dispatch
 */
export const get_Preview_Vote_Action_Action = (idVot) => async(dispatch,getState) => {
    try {
        const res = await axios.get(String(process.env.REACT_APP_API_URL)+"wnominate/diputados/preview/"+idVot)
        dispatch({
            type: GET_PREVIEWVOTE_SUCCESS,
            payload: res.data
        })
    } catch (error) {
        console.log(error)
    }
}