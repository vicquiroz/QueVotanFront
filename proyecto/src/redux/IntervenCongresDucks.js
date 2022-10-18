import axios from 'axios'

const IntervenCongresI = {
    array: []
}



const GET_INTERVENCONGRESS_SUCCESS = 'GET_INTERVENCONGRESS_SUCCESS'
/**
 * It returns the state with the array property set to the payload of the action.
 * @param [state] - the current state of the reducer
 * @param action - {type: "GET_INTERVENCONGRESS_SUCCESS", payload: Array(2)}
 * @returns The state of the reducer.
 */
export default function interven_Congres_Reducer(state = IntervenCongresI, action){
    switch(action.type){
        case GET_INTERVENCONGRESS_SUCCESS:
            return {...state, array: action.payload}
        default:
            return state
    }
}

/**
 * It's a function that takes an IdCongres as a parameter and returns a dispatch function that calls an
 * axios get request to the backend and then dispatches the response to the reducer.
 * @param IdCongres Congressman ID
 * @returns Dispatch 
 */
export const get_Interven_Congress_Action = (IdCongres) => async(dispatch,getState) => {
    try {
        const res = await axios.get(String(process.env.REACT_APP_API_URL+"proyectos/parpatrocinante/"+IdCongres))
        dispatch({
            type: GET_INTERVENCONGRESS_SUCCESS,
            payload: res.data
        })
    } catch (error) {
        console.log(error)
    }
}