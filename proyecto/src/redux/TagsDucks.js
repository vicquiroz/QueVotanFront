import axios from 'axios'

const TagsI = {
    array : []
}

const OBTENER_TAGS_EXITO = 'OBTENER_TAGS_EXITO'

export default function tagsReducer(state = TagsI, action){
    switch(action.type){
        case OBTENER_TAGS_EXITO:
            return {...state, array: action.payload}
        default:
            return state
    }
}

export const obtenerTagsAccion = () => async(dispatch,getState) => {
    try {
        //Esta constante debe ser cambiada por su equivalente en API
        const res = await axios.get('http://164.77.114.243:1081/materias/index/')
        dispatch({
            type: OBTENER_TAGS_EXITO,
            payload: res.data
        })
    } catch (error) {
        console.log(error)
    }
}
