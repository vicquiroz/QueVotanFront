import React from 'react'
import {Container, Input} from 'reactstrap'
function Buscador(){
    return(
        <Container>
            <Input class="form-control me-2" type="search" placeholder="Buscar" aria-label="search"></Input>
        </Container>
    )
}
export default Buscador;