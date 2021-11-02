import React from "react";
import Barra from "../components/barra";
import {Container, Col, Row, Jumbotron, PopoverHeader, PopoverBody, UncontrolledPopover} from "reactstrap";
import {isMobile,CustomView} from 'react-device-detect'
import amellado from "../resources/amellado.webp"
import jgallardo from "../resources/jgallardo.webp"
import jrojas from "../resources/jrojas.webp"
import aparra from "../resources/aparra.webp"
import vquiroz from "../resources/vquiroz.webp"
function AcercaDe(){
    return(
        <Container>
             <Row>
                <Col>
                    <Barra
                        origen={"acercade"}
                    />
                </Col>
            </Row>
            <br/>
            <br/>
            <CustomView condition={isMobile===true}>
                <br/>
                <br/>
            </CustomView>
            <Row>
                <Col>
                    <Container className="text-light" style={{backgroundColor:"rgba(50,50,50,0.95)",borderRadius:"10px"}}>
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
                                    Diputados del Congreso de la República de Chile en el período legislativo 2018-2022
                                    se realizó mediante el algoritmo W-Nominate de Poole y Rosenthal (1985). Se utiliza
                                    como polo de referencia a los Diputados Gastón Saavedra y Joaquín Lavín León. Se utilizaron
                                    todas las votaciones de la legislatura dejando por fuera aquellas en las que el voto
                                    minoritario constituía menos del 2.5% del total.
                                    </p>
                                </Col>
                            </Row>
                            <br />
                            <Row>
                                <Col>
                                    <h3>El proceso de los datos</h3>
                                    <h4>Extracción</h4>
                                    <p>El Congreso Nacional pone a disposición de la ciudadanía su iniciativa de "datos abiertos
                                        legislativos", que se enmarca en el principio de Transparencia y acercamiento de la
                                        labor legislativa que se desarrolla en la Cámara de Diputados, el Senado y la Biblioteca
                                        del Congreso, de acuerdo a la Constitución y las leyes. Con la utilización del OpenData
                                        del congreso se logra la extracción de las votaciones de nuestros parlamentarios.</p>
                                    <h4>Inserción</h4>
                                    <p> La inserción de lo datos extraídos mediante el web scrapping realizado, llega el
                                        momento en el cual los datos son almacenados en servidores locales de la Universidad
                                        Católica de Temuco, utilizando Mongo DB, el cuál permite la infinita inserción de datos
                                        en tablas no relacionales.</p>
                                    <h4>Procesamiento</h4>
                                    <p>Una vez obtenido los datos en tablas, viene el procesamiento de los datos,
                                        para ésto utilizamos el lenguaje de programación R, el cuál es un entorno para
                                        computación y gráficos estadísticos, desarrollado por Bell Laboratories. El entorno
                                        utilizado posee un conjunto de de elementos que están integrados para la manipulación
                                        de datos, cálculo y visualización gráfica. </p>
                                    <h4>Visualización</h4>
                                    Finalmente el proyecto cuenta con la visualización de la información recabada y procesada
                                    anteriormente, implementando una web en la cuál podemos visualizar los datos de manera
                                    responsive, permitiendo la entrega de información a los distintos entusiastas que deseen
                                    informarse sobre los movimientos de los distintos partidos políticos en nuestro país. 
                                </Col>
                            </Row>
                            <br />
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
                                    <h3>Herramientas utilizadas</h3>
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item text-light" style={{backgroundColor:"rgba(0,0,0,0)",borderRadius:"10px", borderWidth:"0px"}}>
                                            <h5>React</h5>
                                            <p>Biblioteca de JavaScript para la construcción de interfaces de usuario.</p>
                                        </li>
                                        <li className="list-group-item text-light" style={{backgroundColor:"rgba(0,0,0,0)",borderRadius:"10px", borderWidth:"0px"}}>
                                            <h5>Reactstrap</h5>
                                            <p>Librería de Bootstrap independiente de jQuery o JavaScript de Bootstrap.</p>
                                        </li>
                                        <li className="list-group-item text-light" style={{backgroundColor:"rgba(0,0,0,0)",borderRadius:"10px", borderWidth:"0px"}}>
                                            <h5>Redux</h5>
                                            <p>Librería de JavaScript para el manejo de estados de datos.</p>
                                        </li>
                                        <li className="list-group-item text-light" style={{backgroundColor:"rgba(0,0,0,0)",borderRadius:"10px", borderWidth:"0px"}}>
                                            <h5>D3.js</h5>
                                            <p>Librería de JavaScript para la manipulación de documentos basados en datos. Se
                                            utiliza la versión para React.</p>
                                        </li>
                                    </ul>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <h3>Sobre nosotros</h3>
                                </Col>
                            </Row>
                            <Row>
                                <Col className="offset-sm-2 col-sm-4 col-12">
                                    <span className="d-block p-2 d-flex">
                                        <UncontrolledPopover trigger="legacy" placement="top" target="Popover1">
                                            <PopoverHeader className="text-light bg-dark">Alejandro Mellado</PopoverHeader>
                                            <PopoverBody className="text-light bg-dark">
                                                <h6>Profesor Asociado</h6>
                                                <p>Ingeniero de Ejecución en Computación e Informática.</p>
                                            </PopoverBody>
                                        </UncontrolledPopover>
                                        <img src={amellado} className="rounded img-fluid" id="Popover1" alt="amellado"/>
                                    </span>
                                </Col>
                                <Col className="col-sm-4 col-12">
                                    <span className="d-block p-2 d-flex">
                                        <UncontrolledPopover trigger="legacy" placement="top" target="Popover2">
                                            <PopoverHeader className="text-light bg-dark">Julio Rojas</PopoverHeader>
                                            <PopoverBody className="text-light bg-dark">
                                                <h6>Profesor Coordinador</h6>
                                                <p>Ingeniero de Sistemas, Mención Investigación de Operaciones.</p>
                                            </PopoverBody>
                                        </UncontrolledPopover>
                                        <img src={jrojas} className="rounded img-fluid" id="Popover2" alt="jrojas"/>
                                    </span>
                                </Col>
                            <Col className="col-sm-4 col-12">
                                    <span className="d-block p-2 d-flex">
                                        <UncontrolledPopover trigger="legacy" placement="top" target="Popover3">
                                            <PopoverHeader className="text-light bg-dark">Juan Gallardo</PopoverHeader>
                                            <PopoverBody className="text-light bg-dark">
                                                <h6>Equipo Técnico</h6>
                                                <p>Estudiante de la carrera Ingeniería Civil Informática.</p>
                                            </PopoverBody>
                                        </UncontrolledPopover>
                                        <img src={jgallardo} className="rounded img-fluid" id="Popover3" alt="jgallardo"/>
                                    </span>
                                </Col>
                                <Col className="col-sm-4 col-12">
                                    <span className="d-flex p-2">
                                        <UncontrolledPopover trigger="legacy" placement="top" target="Popover4">
                                            <PopoverHeader className="text-light bg-dark">Antonio Parra</PopoverHeader>
                                            <PopoverBody className="text-light bg-dark">
                                                <h6>Equipo Técnico</h6>
                                                <p>Estudiante de la carrera Ingeniería Civil Informática.</p>
                                            </PopoverBody>
                                        </UncontrolledPopover>
                                        <img src={aparra} className="rounded img-fluid" id="Popover4" alt="aparra"/>
                                    </span>
                                </Col>
                                <Col className="col-sm-4 d-flex justify-content-around">
                                    <span className="p-2">
                                        <UncontrolledPopover trigger="legacy" placement="top" target="Popover5">
                                            <PopoverHeader className="text-light bg-dark">Victor Quiroz</PopoverHeader>
                                            <PopoverBody className="text-light bg-dark">
                                                <h6>Equipo Técnico</h6>
                                                <p>Estudiante de la carrera Ingeniería Civil Informática.</p>
                                            </PopoverBody>
                                        </UncontrolledPopover>
                                        <img src={vquiroz} className="rounded img-fluid" id="Popover5" alt="vquiroz"/>
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