import React from 'react'
import {Container, Input} from 'reactstrap'

function Buscador({setSearchQuery }){

    return(
        <Container>
                <Input            
                    onInput={e => setSearchQuery(e.target.value)}
                    class="form-control me-2" 
                    type="search" 
                    placeholder="Buscar"
                >
                </Input>
        </Container>
    )
}
export default Buscador;