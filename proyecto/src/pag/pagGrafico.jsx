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
                    <div className="d-flex justify-content-center">
                        <GraficoPrincipal className="col-12"
                            setId={setId}
                            setXY={setXY}
                        />
                    </div>
                </Col>
            </Row>
            <Row>
                <Col className="col-12 col-sm-6">
                    <div className="d-flex justify-content-center">
                        <GraficoBarra idCon={idCon}/>
                    </div>
                </Col>
                <Col className="col-12 col-sm-6">
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