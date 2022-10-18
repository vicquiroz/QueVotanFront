import axios from 'axios'

const porFechaI = {
    array: []
}



const GET_BY_DATE_SUCCESS = 'GET_BY_DATE_SUCCESS'
const GET_BY_DATE_ERROR = 'GET_BY_DATE_ERROR'

/**
 * It returns a new state object with the array property set to the value of the action.payload
 * property.
 * @param [state] - porFechaI
 * @param action - {type: "GET_BY_DATE_SUCCESS", payload: Array(1)}
 * @returns The state is being returned.
 */
export default function by_Date_Reducer(state = porFechaI, action){
    switch(action.type){
        case GET_BY_DATE_SUCCESS:
            return {...state, array: action.payload}
        case GET_BY_DATE_ERROR:
            return {...state, array: action.payload}
        default:
            return state
    }
}

/**
 * It's an async function that takes a date and page , and then uses that to make an API call to a
 * backend server. 
 * @param param Date of the votes being searched for.
 * @param pag - page number
 */
export const get_By_Date_Action = (param,pag) => async(dispatch,getState) => {
    try {
        const res = await axios.get(String(process.env.REACT_APP_API_URL+"votaciones/fecha/"+param.split("!")[0]+"/"+param.split("!")[1]+"?page="+pag+"&limit=10"))
        dispatch({
            type: GET_BY_DATE_SUCCESS,
            payload: res.data.data
        })
    } catch (error) {
        dispatch({
            type: GET_BY_DATE_ERROR,
            payload: error.toJSON().message
        })
    }
}