import React, {useState}  from "react";
import Barra from "../components/barra";
import Tabla from "../components/tabla";
import Buscador from "../components/buscador";
import {Container, Col, Row} from "reactstrap";

function Principal(){

    const [busqueda, setBusqueda] = useState(); 

    return(
        <Container>
            <Row>
                <Col>
                    <Barra/>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Buscador
                        setBusqueda={setBusqueda}
                    />
                </Col>
            </Row>
            <Row>
                <Col>
                    <Tabla
                        busqueda={busqueda}
                    />
                </Col>
            </Row>
        </Container>
    );
}

export default Principal;