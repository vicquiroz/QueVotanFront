import React, {useState}  from "react";
import GraficoPrincipal from "../components/grafico";
import GraficoBarra from "../components/graficobarra";
import Inform from "../components/infoBrush";
import MostrarLista from "../components/listado";
import Barra from "../components/barra";
import {Container, Col, Row} from "reactstrap";

function PagGrafico(){

    const [idCon, setId] = useState();
    const [xyBrush, setXY] = useState(); 
    return(
        <Container>
            <Row>
                <Col>
                    <Barra/>
                </Col>
            </Row>
            <Row>
                <Col>
                    <GraficoPrincipal
                        setId={setId}
                        setXY={setXY}
                    />
                </Col>
            </Row>
            <Row>
                <Col className="col-sm-6">
                    <GraficoBarra/>
                </Col>
                <Col>
                    <Inform
                        pos={xyBrush}
                    />
                </Col>
            </Row>
            <Row>
                <Col>
                    <MostrarLista
                        idCon={idCon}
                    />
                </Col>
            </Row>
        </Container>
    );
}

export default PagGrafico;