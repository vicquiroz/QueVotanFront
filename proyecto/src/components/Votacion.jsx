import React from 'react'

// hooks react redux
import {useDispatch, useSelector} from 'react-redux'

// importamos la acción
import {obtenerVotacionAccion} from '../redux/VotacionDucks'

const Votacion = () => {

    // declaramos displach para llamar a la acción o acciones
    const dispatch = useDispatch()

    // crearmos el state utilizando nuestra tienda
    const votacion = useSelector(store => store.votacion.array)
    return (
        <div>
            <button onClick={() => {
                dispatch(obtenerVotacionAccion())
            }}>Obtener</button>
        </div>
    )
}

export default Votacion