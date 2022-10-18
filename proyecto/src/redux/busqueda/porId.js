import axios from 'axios'

const porIdI = {
    array: []
}



const GET_BY_ID_SUCCESS = 'GET_BY_ID_SUCCESS'

/**
 * It takes the state and an action and returns a new state.
 * @param [state] - porIdI
 * @param action - {type: "GET_BY_ID_SUCCESS", payload: Array()}
 * @returns The state is being returned.
 */
export default function by_Id_Reducer(state = porIdI, action){
    switch(action.type){
        case GET_BY_ID_SUCCESS:
            return {...state, array: action.payload}
        default:
            return state
    }
}
/**
 * 
 * It's an async function that takes an ID, and then uses that ID to make an API call to a
 * backend server. 
 * 
 * The function is called from a React component, and the parameter is passed in from the component.
 * @param param - id of the vote
 */
export const get_By_Id_Action = (param) => async(dispatch,getState) => {
    try {
        const res = await axios.get(String(process.env.REACT_APP_API_URL+"votacion/"+param))
        dispatch({
            type: GET_BY_ID_SUCCESS,
            payload: [res.data.data]
        })
    } catch (error) {
        console.log(error)
    }
}