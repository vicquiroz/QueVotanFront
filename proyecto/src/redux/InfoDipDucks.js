import axios from 'axios'

const InfoDiputadosI = {
    array: []
}



const GET_INFO_DEPUTIES_SUCCESS = 'GET_INFO_DEPUTIES_SUCCESS'

/**
 * "If the action type is GET_INFO_DEPUTIES_SUCCESS, then return a new state object with the array
 * property set to the payload property of the action object."
 * @param [state] - InfoDiputadosI
 * @param action - {type: "GET_INFO_DEPUTIES_SUCCESS", payload: Array()}
 * @returns The state of the reducer.
 */
export default function info_Deputies_Reducer(state = InfoDiputadosI, action){
    switch(action.type){
        case GET_INFO_DEPUTIES_SUCCESS:
            return {...state, array: action.payload}
        default:
            return state
    }
}

/**
 * It's an async function that uses axios to get data from an API, and then dispatches the data to the
 * reducer.
 * @param IdDiputado The ID to select a specific deputy.
 * @returns Dispatch.
 */
export const get_Info_Deputies_Action = (IdDiputado) => async(dispatch,getState) => {
    try {
        const res = await axios.get(String(process.env.REACT_APP_API_URL+"parlamentario/"+IdDiputado))
        dispatch({
            type: GET_INFO_DEPUTIES_SUCCESS,
            payload: res.data.data
        })
    } catch (error) {
        console.log(error)
    }
}