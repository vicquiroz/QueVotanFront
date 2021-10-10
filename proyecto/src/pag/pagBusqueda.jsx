import React, {useState,useEffect}  from "react";
import Barra from "../components/barra";
import Buscador from "../components/buscador";
import {Container, Col, Row} from "reactstrap";
function Busqueda(){
    return(
        <Container>
            <Row>
                <Col>
                    <Barra/>
                </Col>
            </Row>
        </Container>
    );
}

export default Busqueda;