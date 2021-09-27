import React, {useState,useEffect}  from "react";
import Barra from "../components/barra";
import {Container, Col, Row,Jumbotron,Span} from "reactstrap";
function AcercaDe(){
    return(
        <Container>
             <Row>
                <Col>
                    <Barra/>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Container>
                        <Jumbotron className="jumbotron-fluid">
                            <h1 className="display-4">Sobre ¿Qué Votan?</h1>
                            <p className="lead">Es una plataforma que permite visualizar claramente el espectro
                                político del Congreso Nacional de la República de Chile en el
                                período legislativo 2014-2018. Esperamos que "¿Qué Votan?" pueda
                                ser usada por la población chilena en la toma de decisiones durante
                                la elección parlamentaria de Noviembre de 2017. Nuestra intención es
                                lograr que "¿Qué Votan?" pueda perpetuarse en el tiempo, sirviendo como
                                referente en la discusión política parlamentaria de nuestro país.
                            </p>
                            <hr className="my-4"/>
                            <p className="lead">
                            La representación espacial bidimensional del espectro político de la Cámara de
                            Diputados del Congreso de la República de Chile en el período legislativo 2014-2018
                            se realizó mediante el algoritmo W-Nominate de Poole y Rosenthal (1985). En el algoritmo
                            se asumen dos dimensiones: la primera dimensión se considera que modela los aspectos valóricos
                            (liberal - conservador), mientras que la segunda dimensión modelaría la dimensión económica
                            (pro estado - pro mercado). Se utiliza como punto de referencia para definir el polo
                            conservador-conservador al Diputado José Antonio Kast. Se utilizaron todas las votaciones
                            de la legislatura dejando por fuera aquellas en las que el voto minoritario constituía menos
                            del 2.5% del total. 
                            </p>
                            <Row>
                                <Col>
                                    <span className="d-block p-2 bg-dark text-white"><img height="200px"/></span>
                                </Col>
                                <Col>
                                    <span className="d-block p-2 bg-dark text-white"><img height="200px"/></span>
                                </Col>
                                <Col>
                                    <span className="d-block p-2 bg-dark text-white"><img height="200px"/></span>
                                </Col>
                            </Row>
                        </Jumbotron>
                </Container>    
                </Col>
            </Row>
        </Container>
    );
}

export default AcercaDe;