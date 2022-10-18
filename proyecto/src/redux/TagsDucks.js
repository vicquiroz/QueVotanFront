import axios from 'axios'

const TagsI = {
    stateDispatch:false,
    array : []
}


const GET_TAGS_SUCCESS = 'GET_TAGS_SUCCESS'

/**
 * It returns the state with the array property set to the payload of the action.
 * @param [state] - TagsI 
 * @param action - {type: "GET_TAGS_SUCCESS", payload: Array(3)}
 * @returns The state is being returned.
 */
export default function tagsReducer(state = TagsI, action){
    switch(action.type){
        case GET_TAGS_SUCCESS:
            return {...state, array: action.payload}
        default:
            return state
    }
}
/**
 * Function Action that delivers the tags of the "materias"
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
 */
export const get_Tags_Action = () => async(dispatch,getState) => {
    try {
        //Esta constante debe ser cambiada por su equivalente en API
        const res = await axios.get(String(process.env.REACT_APP_API_URL+'materias'))
        dispatch({
            type: GET_TAGS_SUCCESS,
            payload: res.data.data,
            stateDispatch:true
        })
    } catch (error) {
        console.log(error)
    }
}
