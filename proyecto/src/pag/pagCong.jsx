import React, { useEffect, useState } from "react";
import Barra from "../components/barra";
import { Container, Col, Row, Navbar, NavbarBrand, NavLink, Nav, CardBody, Card, CardHeader, CardText } from "reactstrap";
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { obtenerInfoDiputadosAccion } from '../redux/InfoDipDucks';
import { obtenerInfoConsultaAccion } from '../redux/InfoConsultaDucks'
import { obtenerInfoGraficoAccion } from '../redux/InfoGrafDucks'
import Texto from "../components/textocong";
import InfiniteScroll from 'react-infinite-scroll-component'
import nombrepartidos from '../components/nombre-partidos.json'
import partidos from '../components/partidos.json'
import partidosInvertidos from '../components/partidos-invertidos.json'
import statuscolor from '../resources/statuscolor.json'
function Congresista() {
    function isEmpty(obj) {
        return Object.keys(obj).length === 0
    }

    function PrimeraLetraMayuscula(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const [iCL, setICL] = useState([])
    const [limit, setLimit] = useState()
    const { handleIdDip, handleIdVot } = useParams()
    const dispatch = useDispatch()
    const infoDip = useSelector(store => store.infoDiputados.array)
    var intervenCongres = useSelector(store => store.infoConsulta.array)
    const infoGrafico = useSelector(store => store.infoGrafico.array)

    useEffect(() => {
        dispatch(obtenerInfoDiputadosAccion(handleIdDip))
        dispatch(obtenerInfoConsultaAccion("ParlamentarioAutor", handleIdDip))
        dispatch(obtenerInfoGraficoAccion(handleIdVot))

    }, []);

    useEffect(() => {
        intervenCongres = intervenCongres.filter((dat) => { return dat.detalle !== 'No encontrado' })
        setICL(intervenCongres.slice(0, 10))
        setLimit(20)
    }, [intervenCongres])

    const fetchData = () => {
        setTimeout(() => {
            intervenCongres = intervenCongres.filter((dat) => { return dat.detalle !== 'No encontrado' })
            setICL(intervenCongres.slice(0, limit))
            if (limit < intervenCongres.length) {
                setLimit(limit + 10)
            }
        }, 500);
    }

    return (
        <Container className="text-light">
            {!isEmpty(infoDip) && !isEmpty(infoGrafico) ? <div>
                <Row>
                    <Col>
                        <Barra
                            origen={"congresista"}
                        />
                    </Col>
                </Row>
                <br />
                <br />
                <Container style={{ backgroundColor: "rgba(50,50,50,0.95)", borderRadius: "10px" }}>
                    <Row>
                        <Col>
                            <h1>{infoDip.Nombre + " " + infoDip["Apellido Paterno"] + " " + infoDip["Apellido Materno"]}</h1>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="col-md-3">
                            <Navbar className="flex-column align-items-stretch p-3">
                                <NavbarBrand className="text-light">Identificador: {infoDip.id}</NavbarBrand>
                                <Nav className="nav-pills flex-column">
                                    <NavLink className="text-light">Partidos</NavLink>
                                    <Nav className="nav-pills flex-column">
                                        {infoDip.Partido.sort((a, b) => a.begin.split("T")[0] < b.begin.split("T")[0]).map((post,index) => (
                                            <div key={index}>
                                                <NavLink className="ms-3 my-1 text-light">
                                                    <span>{nombrepartidos[post.party]} <span style={{ backgroundColor: partidos[post.party], borderRadius: "5px", color: partidosInvertidos[post.party] }}>  {post.party}  </span></span>
                                                    <Nav className="nav-pills flex-column">
                                                        <table>
                                                            <tbody>
                                                                <tr>
                                                                    <td>Ingreso:</td>
                                                                    <td>{post.begin.split("T")[0]}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Salida: </td>
                                                                    <td>{post.end.split("T")[0]}</td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </Nav>
                                                </NavLink>

                                            </div>
                                        ))}
                                    </Nav>
                                </Nav>
                            </Navbar>
                        </Col>
                        <Col>
                            <Texto infoDip={infoDip} datoswnominate={infoGrafico}/>                  
                        </Col>
                    </Row>
                </Container>
                <br />
                <Container>
                    <Row>
                        <Col>
                            <h4>Votaciones de las que es patrocinante</h4>
                        </Col>
                    </Row>
                    <InfiniteScroll
                        dataLength={iCL.length}
                        next={fetchData}
                        hasMore={true}
                    >
                        {iCL.map((post) => (
                            <div key={post.detalle_id}>
                                <div onClick={() => window.location.href = "/grafico/" + post.detalle_id} style={{ cursor: "pointer", textDecoration: 'none' }}>
                                    <Card className="text-light" style={{ backgroundColor: "rgba(50,50,50,0.95)" }}>
                                        <CardHeader><b>{post.detalle[0].camaraOrigen} - Votacion {post.detalle_id} </b>Ingresada en {post.detalle[0].fechaIngreso.slice(0, 10)} Realizada en {post.detalle[0].VotacionesAsoc[0].date.slice(0, 10)}</CardHeader>
                                        <CardBody>
                                            <CardText>
                                                <b>Boletin N°: </b>{post.detalle[0].numeroBoletin}
                                                <br />
                                                <b>Tipo: </b>{post.detalle[0].VotacionesAsoc[0].tipoProyecto}
                                                <br />
                                                <b>Estado: </b>{PrimeraLetraMayuscula(post.detalle[0].VotacionesAsoc[0].tramiteConst.toLowerCase())} - {PrimeraLetraMayuscula(post.detalle[0].VotacionesAsoc[0].tramiteRegla.toLowerCase())}
                                                <br />
                                                <b>Resultado: </b><strong style={{color:statuscolor[post.detalle[0].VotacionesAsoc[0].resultado]}}>{post.detalle[0].VotacionesAsoc[0].resultado}</strong>
                                                <br />
                                                <b>Descripcion: </b>{post.detalle[0].nombre}
                                            </CardText>
                                        </CardBody>
                                    </Card>
                                </div>
                                <br />
                            </div>
                        ))}
                    </InfiniteScroll>
                </Container>
            </div> : []}
        </Container>
    );
}

export default Congresista;