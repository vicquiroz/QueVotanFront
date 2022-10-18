import axios from 'axios'
const InfoGraficoI = {
    array: {}
}



const GET_INFOGRAPHIC_SUCCESS = 'GET_INFOGRAPHIC_SUCCESS'

/**
 * It takes the state and an action and returns a new state.
 * @param [state] - InfoGraficoI
 * @param action - {type: "GET_INFOGRAPHIC_SUCCESS", payload: Array(2)}
 * @returns The state is being returned.
 */
export default function Info_Graphic_Reducer(state = InfoGraficoI, action){
    switch(action.type){
        case GET_INFOGRAPHIC_SUCCESS:
            return {...state, array: action.payload}
        default:
            return state
    }
}

/**
 * It's a function that takes an idWnominate as a parameter, and then it makes an axios call to the
 * backend to get the data for that idWnominate.
 * @param idWnominate - ID to get the chart information according to a certain wnominate.
 * @returns Dispatch.
 */
export const get_Info_Graphic_Accion = (idWnominate) => async(dispatch,getState) => {
    try {
        const res = await axios.get(String(process.env.REACT_APP_API_URL)+"wnominate/"+idWnominate)
        dispatch({
            type: GET_INFOGRAPHIC_SUCCESS,
            payload: res.data.data
        })
    } catch (error) {
        console.log(error)
    }
}