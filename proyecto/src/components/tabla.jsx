import React, {useEffect, useState} from 'react'
import {Container, CardBody, Card, CardHeader, CardText, Spinner, Col} from 'reactstrap'
import InfiniteScroll from 'react-infinite-scroll-component'
import statuscolor from '../resources/statuscolor.json'
import {useDispatch, useSelector} from 'react-redux'
import {obtenerPrimerasVotacionesAccion} from '../redux/VotacionDucks'
import {obtenerPorMateriaAccion} from '../redux/busqueda/porMateria'
import {obtenerPorIdAccion} from '../redux/busqueda/porId'
import {useParams} from "react-router";
function Tabla({primerasVotaciones,metodo}){
    const dispatch = useDispatch()
    const {handleMetodo,handleValor} = useParams()
    const [ListaVot,setListaVot]=useState(primerasVotaciones)
    const [pag,setPag]=useState(2)
    const porMateria = useSelector(store=>store.porMateria.array)
    const porId = useSelector(store=>store.porId.array)
    const VotacionesSiguientes = useSelector(store => store.primerasVotaciones.array)
    function isEmpty(obj) {
        return Object.keys(obj).length === 0
    }
    const fetchData = () =>{
        setTimeout(() => {
            setPag(pag+1)
            switch (metodo) {
                case "principal":
                    dispatch(obtenerPrimerasVotacionesAccion(pag))
                    setListaVot([...ListaVot,...VotacionesSiguientes])
                    break;
                case "Materia":
                    dispatch(obtenerPorMateriaAccion(handleValor,pag))
                    setListaVot([...ListaVot,...porMateria])
                    break;
                default:
                    break;
            }
        },0);
    }
    return(
        <Container>
                {!isEmpty(ListaVot)?
                <InfiniteScroll
                dataLength={ListaVot.length}
                next={fetchData}
                hasMore={true}
                loader={
                    <div style={{textAlign:"center"}}>
                        <Spinner color="primary" children="" ></Spinner>
                    </div>
                }
                endMessage={
                    <p style={{ textAlign: 'center' }}>
                      <h4 className="text-light">No existen más votaciones</h4>
                    </p>
                  }
                >
                {ListaVot.map((post,index) => (
                    <div key={index}>
                    <div onClick={()=> window.location.href="/grafico/"+post.id} style={{ cursor:"pointer",textDecoration: 'none' }}>
                        <Card className="text-light" style={{backgroundColor:"rgba(50,50,50,0.95)"}}>
                            <CardHeader><b>Camara de diputados - Votacion {post.id} </b>- Ingresada en {post.fechaIngresoBoletin.slice(0,10)} - Realizada en {post.fechaSalidaBoletin.slice(0,10)}</CardHeader>
                            <CardBody>
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
                </InfiniteScroll>
                :[]}
        </Container>
    )
}
export default Tabla;