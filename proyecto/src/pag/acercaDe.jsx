import React, {useState}  from "react";
import Barra from "../components/barra";
import {Container, Col, Row, Jumbotron, Popover, PopoverHeader, PopoverBody, UncontrolledPopover} from "reactstrap";
import amellado from "../resources/amellado.jpg"
import jgallardo from "../resources/jgallardo.jpg"
import jrojas from "../resources/jrojas.jpg"
import aparra from "../resources/aparra.png"
import vquiroz from "../resources/vquiroz.png"
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
                            <Row>
                                <Col>
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
                                </Col>
                            </Row>
                            {/*
                            <Row>
                                <Col>
                                    <h3>Sobre el algoritmo WNominate</h3>
                                </Col>
                            </Row>
                            <Row>
                                
                            </Row>
                            */}
                            <Row>
                                <Col>
                                    <h3>Sobre nosotros</h3>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <span className="d-block p-2 d-flex justify-content-center">
                                        <UncontrolledPopover trigger="legacy" placement="top" target="Popover1">
                                            <PopoverHeader>Alejandro Mellado</PopoverHeader>
                                            <PopoverBody>
                                                <h6>Profesor Asociado</h6>
                                                <p>Ingeniero de Ejecución en Computación e Informática.</p>
                                            </PopoverBody>
                                        </UncontrolledPopover>
                                        <img src={amellado} className="rounded img-fluid" id="Popover1"/>
                                    </span>
                                </Col>
                                <Col>
                                    <span className="d-block p-2 d-flex justify-content-center">
                                        <UncontrolledPopover trigger="legacy" placement="top" target="Popover2">
                                            <PopoverHeader>Julio Rojas</PopoverHeader>
                                            <PopoverBody>
                                                <h6>Profesor Coordinador</h6>
                                                <p>Ingeniero de Sistemas, Mención Investigación de Operaciones.</p>
                                            </PopoverBody>
                                        </UncontrolledPopover>
                                        <img src={jrojas} className="rounded img-fluid" id="Popover2"/>
                                    </span>
                                </Col>
                            </Row>
                            <Row>
                            <Col>
                                    <span className="d-block p-2 d-flex justify-content-center">
                                        <UncontrolledPopover trigger="legacy" placement="top" target="Popover3">
                                            <PopoverHeader>Juan Gallardo</PopoverHeader>
                                            <PopoverBody>
                                                <h6>Equipo Técnico</h6>
                                                <p>Estudiante de la carrera Ingeniería Civil Informática.</p>
                                            </PopoverBody>
                                        </UncontrolledPopover>
                                        <img src={jgallardo} className="rounded img-fluid" id="Popover3"/>
                                    </span>
                                </Col>
                                <Col>
                                    <span className="d-block p-2 d-flex justify-content-center">
                                        <UncontrolledPopover trigger="legacy" placement="top" target="Popover4">
                                            <PopoverHeader>Antonio Parra</PopoverHeader>
                                            <PopoverBody>
                                                <h6>Equipo Técnico</h6>
                                                <p>Estudiante de la carrera Ingeniería Civil Informática.</p>
                                            </PopoverBody>
                                        </UncontrolledPopover>
                                        <img src={aparra} className="rounded img-fluid" id="Popover4"/>
                                    </span>
                                </Col>
                                <Col>
                                    <span className="d-block p-2 d-flex justify-content-center">
                                        <UncontrolledPopover trigger="legacy" placement="top" target="Popover5">
                                            <PopoverHeader>Victor Quiroz</PopoverHeader>
                                            <PopoverBody>
                                                <h6>Equipo Técnico</h6>
                                                <p>Estudiante de la carrera Ingeniería Civil Informática.</p>
                                            </PopoverBody>
                                        </UncontrolledPopover>
                                        <img src={vquiroz} className="rounded img-fluid" id="Popover5"/>
                                    </span>
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