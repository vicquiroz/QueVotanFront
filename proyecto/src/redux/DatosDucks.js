// Constantes
const datosIniciales = {
    array : []
}

// Tipos
const OBTENER_DATOS_EXITO = 'OBTENER_DATOS_EXITO'

// Reductor
export default function ReductorDatos(state = datosIniciales, accion){
    switch(accion){
        case OBTENER_DATOS_EXITO:
            return {...state, array : action.payload}
        default: // En el caso que no se reciba lo correcto
            return state
    }
}

// Acciones
export const obtenerDatosAccion = () => async(dispatch, getState) => {
    try{
        // Respuesta
        // Dentro del get debe de estar la URL a la pagina
        const res = await axios.get()
        dispatch({
            type: OBTENER_DATOS_EXITO,
            payload: res.data.results // Esta linea depende como esten organizados los datos
        })
    } catch (error){
        // Debe ser removido posteriormente en la publicación del proyecto
        console.log(error)
    }
}