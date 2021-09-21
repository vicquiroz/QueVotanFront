import React from 'react'
import {Container, Input} from 'reactstrap'

function Buscador({setBusqueda,tags}){
    console.log(tags)
    return(
        <Container>
                <Input
                    onInput={e => setBusqueda(e.target.value)}
                    className="form-control me-2" 
                    type="search" 
                    placeholder="Buscar"
                >
                </Input>
        </Container>
    )
}
export default Buscador;