import React, {useState} from 'react'
import paleta from "../resources/paleta.json"
import {Container, CardBody, Card, CardHeader, CardText, Spinner, Col} from 'reactstrap'
import InfiniteScroll from 'react-infinite-scroll-component'
import statuscolor from '../resources/statuscolor.json'
import {useDispatch, useSelector} from 'react-redux'
import {obtenerPrimerasVotacionesAccion} from '../redux/VotacionDucks'
import {obtenerPorMateriaAccion} from '../redux/busqueda/porMateria'
import {obtenerPorBoletinAccion} from '../redux/busqueda/porBoletin'
import {obtenerPorNombreAccion} from '../redux/busqueda/porNombre'
import {obtenerPorFechaAccion} from '../redux/busqueda/porFecha'
import {useParams} from "react-router";

/**
 * Funcion encargada de buscar las siguientes cards de las votaciones segun su metodo.
 * @param {*} primerasVotaciones Las primeras votaciones entergadas por la API.
 * @param {*} metodo Metodo de busqueda seleccionado.
 * @returns < Container > con la estructura de las listas de cards de las votaciones segun su metodo.
 */
function Tabla({primerasVotaciones,metodo}){
    const dispatch = useDispatch()
    const {handleValor} = useParams()
    const [ListaVot,setListaVot]=useState(primerasVotaciones)
    const [status,setStatus]=useState(true)
    const [pag,setPag]=useState(2)
    const porMateria = useSelector(store=>store.porMateria.array)
    const porBoletin = useSelector(store=>store.porBoletin.array)
    const porNombre = useSelector(store=>store.porNombre.array)
    const porFecha = useSelector(store=>store.porFecha.array)
    const VotacionesSiguientes = useSelector(store => store.primerasVotaciones.array)
    function isEmpty(obj) {
        return Object.keys(obj).length === 0
    }
    const fetchData = () =>{
        setTimeout(() => {
            setPag(pag+1)
            switch (metodo) {
                case "principal":
                    dispatch(obtenerPrimerasVotacionesAccion(pag))//obtiene las votaciones de la siguiente pagina de la API
                    if((typeof(VotacionesSiguientes)!=="string")){
                        setListaVot([...ListaVot,...VotacionesSiguientes])//actualiza ListaVot y le agrega los valores de VotacionesSiguientes
                        let ListaTemp=[...ListaVot,...VotacionesSiguientes]
                        setListaVot([...new Set(ListaTemp)])
                    }
                    else setStatus(false)
                    break;
                case "Materia":
                    dispatch(obtenerPorMateriaAccion(handleValor,pag))
                    if((typeof(porMateria)!=="string")){
                        setListaVot([...ListaVot,...porMateria])
                        let ListaTemp=[...ListaVot,...porMateria]
                        setListaVot([...new Set(ListaTemp)])
                    }
                    else setStatus(false)
                    break;
                case "Boletín":
                    dispatch(obtenerPorBoletinAccion(handleValor,pag))
                    if(typeof(porBoletin)!=="string"){
                        setListaVot([...ListaVot,...porBoletin])
                        let ListaTemp=[...ListaVot,...porBoletin]
                        setListaVot([...new Set(ListaTemp)])
                    }
                    else setStatus(false)
                    break;
                case "Nombre":
                    dispatch(obtenerPorNombreAccion(handleValor,pag))
                    if(typeof(porNombre)!=="string"){
                        setListaVot([...ListaVot,...porNombre])
                        let ListaTemp=[...ListaVot,...porNombre]
                        setListaVot([...new Set(ListaTemp)])
                    }
                    else setStatus(false)
                    break;
                case "Fecha":
                    dispatch(obtenerPorFechaAccion(handleValor,pag))
                    if(typeof(porFecha)!=="string"){
                        setListaVot([...ListaVot,...porFecha])
                        let ListaTemp=[...ListaVot,...porFecha]
                        setListaVot([...new Set(ListaTemp)])
                    }
                    else setStatus(false)
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
                hasMore={status}
                loader={
                    <div style={{textAlign:"center"}}>
                        <Spinner color="primary" children="" ></Spinner>
                    </div>
                }
                endMessage={
                    <p style={{ textAlign: 'center',borderRadius: "10px",backgroundColor:paleta.fondoMid,padding:"10px"}}>
                      <h4 className={paleta.colorTextoBootstrap}>No existen más votaciones</h4>
                    </p>
                  }
                >
                {ListaVot.map((post,index) => (
                    <div key={index}>
                    <div onClick={()=> window.location.href="/grafico/"+post.id} style={{ cursor:"pointer",textDecoration: 'none' }}>
                        <Card className={paleta.colorTextoBootstrap} style={{backgroundColor:paleta.colorBgCard}}>
                            <CardHeader style={{backgroundColor:paleta.colorTopCard}}><b>Camara de diputados - Votacion {post.id} </b>- Ingresada en {post.fechaIngresoBoletin.slice(0,10)} - Realizada en {post.fechaSalidaBoletin.slice(0,10)}</CardHeader>
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