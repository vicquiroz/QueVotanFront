import React, { useEffect} from "react";
import paleta from "../resources/paleta.json"
import Barra from "../components/barra";
import { Container, Col, Row, Navbar, NavbarBrand, NavLink, Nav, CardBody, Card, CardHeader, CardText } from "reactstrap";
import { useParams } from 'react-router-dom'
import {CustomView,isMobile} from 'react-device-detect'
import { useDispatch, useSelector } from 'react-redux'
import { get_Info_Deputies_Action } from '../redux/InfoDipDucks';
import { get_Info_Graphic_Accion } from '../redux/InfoGrafDucks'
import Texto from "../components/textocong";
import nombrepartidos from '../components/nombre-partidos.json'
import partidos from '../components/partidos.json'
import partidosInvertidos from '../components/partidos-invertidos.json'
import statuscolor from '../resources/statuscolor.json'


function Congresista(){
    const { handleIdDip, handleIdVot } = useParams()
    const dispatch = useDispatch()
    const infoDip = useSelector(store => store.info_Deputies.array)
    const info_Graphic = useSelector(store => store.info_Graphic.array)

    function isEmpty(obj) {
        return Object.keys(obj).length === 0
    }

    useEffect(() => {
        dispatch(get_Info_Deputies_Action(handleIdDip))
        dispatch(get_Info_Graphic_Accion(handleIdVot))
    }, []);

    return(
        <Container className={paleta.colorTextoBootstrap}>
            {!isEmpty(infoDip) && !isEmpty(info_Graphic)?
                <div>
                    <Row>
                    <Col>
                        <Barra
                            origen={"congresista"}
                        />
                    </Col>
                    </Row>
                    <br />
                    <br />
                    <CustomView condition={isMobile===true}>
                        <br/>
                        <br/>
                    </CustomView>
                    <Container style={{ backgroundColor:paleta.fondoClaro, borderRadius: "10px" }}>
                        <Row>
                            <Col>
                                <h1>{infoDip.nombre + " " + infoDip.apellidoP + " " + infoDip.apellidoM}</h1>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="col-md-3">
                                <Navbar className="flex-column align-items-stretch p-3">
                                    <NavbarBrand className={paleta.colorTextoBootstrap}>Identificador: {infoDip.id}</NavbarBrand>
                                    <Nav className="nav-pills flex-column">
                                        <NavLink className={paleta.colorTextoBootstrap}>Partidos</NavLink>
                                        <Nav className="nav-pills flex-column">
                                            {infoDip.periodo.map((post,index) => (
                                                <div key={index}>
                                                    <NavLink className={"ms-3 my-1 "+paleta.colorTextoBootstrap}>
                                                        <span>{nombrepartidos[post.partido]} <span style={{ backgroundColor: partidos[post.partido], borderRadius: "5px", color: partidosInvertidos[post.partido] }}>  {post.partido}  </span></span>
                                                        <Nav className="nav-pills flex-column">
                                                            <table>
                                                                <tbody>
                                                                    <tr>
                                                                        <td>Ingreso:</td>
                                                                        <td>{post.fechaInicio.split("T")[0]}</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>Salida: </td>
                                                                        <td>{post.fechaTermino.split("T")[0]}</td>
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
                            <Col className="col-md-4">
                                <Navbar className="flex-column align-items-stretch p-3">
                                    <NavLink className={paleta.colorTextoBootstrap}>
                                        Sector: {infoDip.distrito[0].region}
                                    </NavLink>
                                    <Nav className="nav-pills flex-column">
                                        <NavLink className={"ms-3 "+paleta.colorTextoBootstrap}>
                                            Distrito {infoDip.distrito[0].distrito}
                                        </NavLink>
                                        <NavLink className={"ms-3 "+paleta.colorTextoBootstrap}>
                                            Comunas que representa:
                                        </NavLink>
                                        <Nav className="nav-pills flex-column">
                                            <table className="ms-5">
                                                <tbody>
                                                        {infoDip.distrito[0].comunas.map((post,index)=>(
                                                            <tr key={index} >
                                                                <td>{post}</td>
                                                            </tr>
                                                        ))}
                                                </tbody>
                                            </table>
                                        </Nav>
                                    </Nav>
                                </Navbar>
                            </Col>
                            <Col>
                                <Texto infoDip={infoDip} datoswnominate={info_Graphic}/>                  
                            </Col>
                        </Row>
                    </Container>
                    <br/>
                        {infoDip.votaciones.map((post,index) => (
                            <div key={index}>
                            <div onClick={()=> window.location.href="/grafico/"+post.id} style={{ cursor:"pointer",textDecoration: 'none' }}>
                                <Card className={paleta.colorTextoBootstrap} style={{backgroundColor:paleta.fondoMid}}>
                                    <CardHeader style={{backgroundColor:paleta.colorTopCard}}><b>Camara de diputados - Votacion {post.id} </b>- Ingresada en {post.fechaIngresoBoletin.slice(0,10)} - Realizada en {post.fechaSalidaBoletin.slice(0,10)}</CardHeader>
                                    <CardBody style={{backgroundColor:paleta.colorBgCard}}>
                                        <CardText>
                                            <b>Boletin N°: </b>{post.boletin.slice(10,20)}
                                            <br/>
                                            <b>Tipo: </b>{post.tipoProyecto}
                                            <br/>
                                            <b>Estado: </b>{post.tramiteConst} - {post.tramiteRegla}
                                            <br/>
                                            <b>Votos: {post.totalSi} - {post.totalNo} - {post.totalAbs} - {post.totalDis}</b> (A favor - En contra - Abstenidos - Dispensados)
                                            <br/>
                                            <b>Resultado: </b><strong style={{color:statuscolor[post.resultado]}}>{post.resultado}</strong>
                                            <br/>
                                            <b>Descripcion: </b>{post.nombre}
                                            <br/>
                                            <b>Quórum: </b>{post.quorum}
                                        </CardText>
                                    </CardBody>
                                </Card>
                            </div>
                            <br/>
                            </div>
                        ))}
                </div>
            :[]}
        </Container>
    )
}
export default Congresista;