import React from 'react'

// hooks react redux
import {useDispatch, useSelector} from 'react-redux'

// importamos la acción
import {obtenerDatosAccion} from '../Redux/datosDucks'

const Datos = () => {

    // declaramos displach para llamar a la acción o acciones
    const dispatch = useDispatch()

    // crearmos el state utilizando nuestra tienda
    const datos = useSelector(store => store.datos.array)
    return (
        <div>
            <button onClick={() => {
                dispatch(obtenerDatosAccion())
            }}>Obtener</button>
        </div>
    )
}

export default Datos