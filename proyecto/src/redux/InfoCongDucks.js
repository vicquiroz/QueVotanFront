import axios from 'axios'

const InfoCongresistasI = {
    array: []
}


const OBTENER_INFOCONGRESISTAS_EXITO = 'OBTENER_INFOCONGRESISTAS_EXITO'

/**
 * Reducer para el estado al conseguir la informacion de los congresistas.
 * @param {InfoCongresistasI} state el estado de la aplicacion
 * @param {*} action la action.type: 'OBTENER_INFOCONGRESISTAS_EXITO'
 * @returns El nuevo estado de la aplicacion.
 */
export default function infoCongresistasReducer(state = InfoCongresistasI, action){
    switch(action.type){
        case OBTENER_INFOCONGRESISTAS_EXITO:
            return {...state, array: action.payload}
        default:
            return state
    }
}

/**
 * Funcion accion para obtener la infromacion de los congrecistas.
 * @returns Dispatch type: OBTENER_INFOCONGRESISTAS_EXITO payload: con la data
 */
export const obtenerInfoCongresistasAccion = () => async(dispatch,getState) => {
    try {
        //Esta constante debe ser cambiada por su equivalente en API
        const res = await axios.get(String(process.env.REACT_APP_API_URL))
        dispatch({
            type: OBTENER_INFOCONGRESISTAS_EXITO,
            payload: res.data
        })
    } catch (error) {
        console.log(error)
    }
}