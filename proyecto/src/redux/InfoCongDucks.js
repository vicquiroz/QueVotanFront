import axios from 'axios'

const InfoCongresistasI = {
    array: []
}


const GET_INFOCONGRESS_SUCCESS = 'GET_INFOCONGRESS_SUCCESS'

/**
 * It takes a state and an action and returns a new state.
 * @param [state] - InfoCongresistasI
 * @param action - {type: "GET_INFOCONGRESS_SUCCESS", payload: Array(1)}
 * @returns The state is being returned.
 */
export default function info_Congressmen_Reducer(state = InfoCongresistasI, action){
    switch(action.type){
        case GET_INFOCONGRESS_SUCCESS:
            return {...state, array: action.payload}
        default:
            return state
    }
}

/**
 * It's an async function that uses axios to make a get request to an API, and then dispatches an
 * action to the reducer with the data from the API with the information of the congressmen.
 */
export const get_Info_Congressmen_Accion = () => async(dispatch,getState) => {
    try {
        const res = await axios.get(String(process.env.REACT_APP_API_URL))
        dispatch({
            type: GET_INFOCONGRESS_SUCCESS,
            payload: res.data
        })
    } catch (error) {
        console.log(error)
    }
}