import axios from 'axios'
const InfoGraficoI = {
    array: {}
}



const OBTENER_INFOGRAFICO_EXITO = 'OBTENER_INFOGRAFICO_EXITO'


/**
 * Reducer para el estado de la informacion del grafico
 * @param {InfoGraficoI} state Estado de la aplicacion
 * @param {*} action La accion a realizar con action.type: 'OBTENER_INFOGRAFICO_EXITO'
 * @returns El nuevo estado al obtener la iformacion del grafico.
 */
export default function infoGraficoReducer(state = InfoGraficoI, action){
    switch(action.type){
        case OBTENER_INFOGRAFICO_EXITO:
            return {...state, array: action.payload}
        default:
            return state
    }
}

/**
 * Funcion accion para obtener la inmformacion del grafico
 * @param {*} idWnominate ID para obtener la informacion del grafico segun cierto wnominate
 * @returns Dispatch con type: 'OBTENER_INFOGRAFICO_EXITO' y payload: con la data de "wnominate/"+idWnominate
 */
export const obtenerInfoGraficoAccion = (idWnominate) => async(dispatch,getState) => {
    try {
        const res = await axios.get(String(process.env.REACT_APP_API_URL)+"wnominate/"+idWnominate)
        dispatch({
            type: OBTENER_INFOGRAFICO_EXITO,
            payload: res.data.data
        })
    } catch (error) {
        console.log(error)
    }
}