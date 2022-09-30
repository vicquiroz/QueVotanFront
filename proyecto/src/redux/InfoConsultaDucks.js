import axios from 'axios'

const InfoConsultasI = {
    array: []
}


const OBTENER_INFOCONSULTA_EXITO = 'OBTENER_INFOCONSULTA_EXITO'


/**
 * Reducer del estado al hacer una busqueda por tipo.
 * @param {InfoConsultasI} state El estado de la aplicacion.
 * @param {*} action La accion.type: 'OBTENER_INFOCONSULTA_EXITO'
 * @returns El nuevo estado de la aplicacion.
 */
export default function infoConsultaReducer(state = InfoConsultasI, action){
    switch(action.type){
        case OBTENER_INFOCONSULTA_EXITO:
            return {...state, array: action.payload}
        default:
            return state
    }
}


/**
 * Funcion action para obtener la informacion de una consulta segun tipo y valor; ej: typo:'nombre' valor:"Nombre_diputado"
 * @param {String} Tipo Puede contener los siguientes: "Materia" | "Nombre" | "Boletín" | "ID" | "Fecha"
 * @param {String} Valor Es el valor a buscar segun el tipo de busqueda que se selecciono.
 * @returns Dispatch con la data de la consulta para dibujarla en la pagina
 */
export const obtenerInfoConsultaAccion = (Tipo,Valor) => async(dispatch,getState) => {
    try {
        const res = await axios.get(String(process.env.REACT_APP_API_URL+"wnominate/diputados/preview/teste/"+Tipo+"/"+Valor))
        dispatch({
            type: OBTENER_INFOCONSULTA_EXITO,
            payload: res.data
        })
    } catch (error) {
        console.log(error)
    }
}