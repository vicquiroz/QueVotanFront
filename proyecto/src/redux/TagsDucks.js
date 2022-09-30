import axios from 'axios'

const TagsI = {
    stateDispatch:false,
    array : []
}


const OBTENER_TAGS_EXITO = 'OBTENER_TAGS_EXITO'

/**
 * Reducer para la busqueda de los tags.
 * @param {TagsI} state Recibe un estado por defecto con un array vacio y un stateDispatch: false
 * @param {OBTENER_TAGS_EXITO} action action.type = 'OBTENER_TAGS_EXITO'
 * @returns El nuevo estado si el action.type = 'OBTENER_TAGS_EXITO'
 */

export default function tagsReducer(state = TagsI, action){
    switch(action.type){
        case OBTENER_TAGS_EXITO:
            return {...state, array: action.payload}
        default:
            return state
    }
}

/**
 * Funcion accion para crear el dispatch de la obtencion de los tags.
 * @returns {dispatch} dispatch con el type 'OBTENER_TAGS_EXITO' y el payload: con la data de materias
 */
export const obtenerTagsAccion = () => async(dispatch,getState) => {
    try {
        //Esta constante debe ser cambiada por su equivalente en API
        const res = await axios.get(String(process.env.REACT_APP_API_URL+'materias'))
        dispatch({
            type: OBTENER_TAGS_EXITO,
            payload: res.data.data,
            stateDispatch:true
        })
    } catch (error) {
        console.log(error)
    }
}
