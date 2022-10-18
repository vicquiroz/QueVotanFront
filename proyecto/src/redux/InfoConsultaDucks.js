import axios from 'axios'

const InfoConsultasI = {
    array: []
}


const GET_INFO_CONSULT_SUCCESS = 'GET_INFO_CONSULT_SUCCESS'

/**
 * It takes the state and an action and returns a new state.
 * @param [state] - InfoConsultasI
 * @param action - {type: "GET_INFO_CONSULT_SUCCESS", payload: Array()}
 * @returns The state is being returned.
 */
export default function info_Consult_Reducer(state = InfoConsultasI, action){
    switch(action.type){
        case GET_INFO_CONSULT_SUCCESS:
            return {...state, array: action.payload}
        default:
            return state
    }
}
/**
 * It's a function that takes two parameters, Tipo and Valor, and then uses those parameters to make an
 * API call to a URL that is constructed using the parameters. 
 * @param Tipo - is the type of search, it can be by name or by party
 * @param Valor - is the value of the input
 */
export const get_Info_Consult_Action = (Tipo,Valor) => async(dispatch,getState) => {
    try {
        const res = await axios.get(String(process.env.REACT_APP_API_URL+"wnominate/diputados/preview/teste/"+Tipo+"/"+Valor))
        dispatch({
            type: GET_INFO_CONSULT_SUCCESS,
            payload: res.data
        })
    } catch (error) {
        console.log(error)
    }
}