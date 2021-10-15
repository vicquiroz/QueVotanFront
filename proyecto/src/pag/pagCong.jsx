import React,{useEffect, useState} from "react";
import Barra from "../components/barra";
import {Container, Col, Row, Button, Navbar,NavbarBrand,NavLink,Nav} from "reactstrap";
import {useParams} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { obtenerInfoDiputadosAccion } from '../redux/InfoDipDucks';
import { obtenerIntervenCongresAccion} from '../redux/IntervenCongresDucks'
import {obtenerInfoGraficoAccion} from '../redux/InfoGrafDucks'
import GraficoCong, {GraficoBarra} from '../components/graficocong'
import InfiniteScroll from 'react-infinite-scroll-component'
import nombrepartidos from '../components/nombre-partidos.json'
import { Link } from "react-router-dom";
import partidos from '../components/partidos.json'
function Congresista(){
    function isEmpty(obj){
        return Object.keys(obj).length===0
    }
    const [iCL,setICL] = useState([])
    const [limit,setLimit]=useState()
    const {handleIdDip,handleIdVot} = useParams()
    const dispatch = useDispatch()
    const infoDip = useSelector(store => store.infoDiputados.array)
    const intervenCongres = useSelector(store => store.intervenCongres.array)
    const infoGrafico = useSelector(store => store.infoGrafico.array)
    useEffect(()=> {
            dispatch(obtenerInfoDiputadosAccion(handleIdDip))
            dispatch(obtenerIntervenCongresAccion(handleIdDip))
            dispatch(obtenerInfoGraficoAccion(handleIdVot))
    },[]);
    useEffect(()=>{
        setICL(intervenCongres.slice(0,30))
        setLimit(60)
    },[intervenCongres])
    const fetchData = () =>{
        setTimeout(() => {
            setICL(intervenCongres.slice(0,limit))
            if(limit<intervenCongres.length){
                setLimit(limit+30)
            }
        },500);
    }
    return(
        <Container className="text-light" style={{backgroundColor:"rgba(50,50,50,0.95)",borderRadius:"10px"}}>
            {!isEmpty(infoDip)&&!isEmpty(infoGrafico)?<div>
            <Row>
                <Col>
                    <Barra/>
                </Col>
            </Row>
            <Container>
                <Row>
                    <Col>
                        <h1>{infoDip.Nombre+" "+infoDip["Apellido Paterno"]+" "+infoDip["Apellido Materno"]}</h1>
                    </Col>  
                </Row>
                <Row>
                    <Col className="col-md-3">
                        <Navbar className="flex-column align-items-stretch p-3">
                            <NavbarBrand className="text-light">Identificador: {infoDip.id}</NavbarBrand>
                            <Nav className="nav-pills flex-column">
                                <NavLink className="text-light">Partidos</NavLink>
                                <Nav className="nav-pills flex-column">
                                    {infoDip.Partido.sort((a, b) => a.begin.split("T")[0] < b.begin.split("T")[0]).map((post) => (
                                        <div>
                                            <NavLink className="ms-3 my-1 text-light">
                                            <span>{nombrepartidos[post.party]}<span style={{color:partidos[post.party]}}>({post.party})</span></span>
                                                <Nav className="nav-pills flex-column">
                                                    <tr>
                                                        <td>Ingreso:</td>
                                                        <td>{post.begin.split("T")[0]}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Salida: </td>
                                                        <td>{post.end.split("T")[0]}</td>
                                                    </tr>   
                                                </Nav>
                                            </NavLink>
                                            
                                        </div>
                                    ))}
                                </Nav>
                            </Nav>
                        </Navbar>
                    </Col>
                    <Col>
                        <GraficoCong idDip={handleIdDip} datoswnominate={infoGrafico}/>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h4>Votaciones donde ha participado</h4>
                    </Col>
                </Row>
                <InfiniteScroll
                dataLength={iCL.length}
                next={fetchData}
                hasMore={true}
                >
                    {iCL.map((post)=>(
                    /*<Link onClick={()=> window.location.href="/grafico/"+post.id} style={{ textDecoration: 'none' }}>*/
                    <li className="text-light noselect" key={post["id"]}>   
                        {post["Titulo"]}
                    </li>
                    
                    /*</Link>*/
                    ))}
                </InfiniteScroll>
            </Container>
            </div>:[]}
        </Container>
    );
}

export default Congresista;