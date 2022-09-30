import axios from 'axios'

const InfoDiputadosI = {
    array: []
}



const OBTENER_INFODIPUTADOS_EXITO = 'OBTENER_INFODIPUTADOS_EXITO'


/**
 * Reducer del estado al tener la informacion de los diputados.
 * @param {InfoDiputadosI} state Estado de la apicacion.
 * @param {*} action La accion al buscar la informacion de un diputado action.type: 'OBTENER_INFODIPUTADOS_EXITO'.
 * @returns El nuevo estado de la aplicacion.
 */
export default function infoDiputadosReducer(state = InfoDiputadosI, action){
    switch(action.type){
        case OBTENER_INFODIPUTADOS_EXITO:
            return {...state, array: action.payload}
        default:
            return state
    }
}


/**
 * Funcion Accion para obtener la informacion de un diputado.
 * @param {*} IdDiputado El ID para seleccionar un diputado en especifico.
 * @returns Disptach con el type: 'OBTENER_INFODIPUTADOS_EXITO' y el payload: data de "parlamentario/"+IdDiputado
 */
export const obtenerInfoDiputadosAccion = (IdDiputado) => async(dispatch,getState) => {
    try {
        const res = await axios.get(String(process.env.REACT_APP_API_URL+"parlamentario/"+IdDiputado))
        dispatch({
            type: OBTENER_INFODIPUTADOS_EXITO,
            payload: res.data.data
        })
    } catch (error) {
        console.log(error)
    }
}