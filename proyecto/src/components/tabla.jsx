import React, {useState} from 'react'
import paleta from "../resources/paleta.json"
import {Container, CardBody, Card, CardHeader, CardText, Spinner, Col} from 'reactstrap'
import InfiniteScroll from 'react-infinite-scroll-component'
import statuscolor from '../resources/statuscolor.json'
import {useDispatch, useSelector} from 'react-redux'
import {get_First_Votes_Action} from '../redux/VotacionDucks'
import {get_By_Matter_Action} from '../redux/busqueda/porMateria'
import {get_By_Bulletin_Action} from '../redux/busqueda/porBoletin'
import {get_By_Name_Action} from '../redux/busqueda/porNombre'
import {get_By_Date_Action} from '../redux/busqueda/porFecha'
import {useParams} from "react-router";

/**
 * Funcion encargada de buscar las siguientes cards de las votaciones segun su metodo.
 * @param {*} first_Votations Las primeras votaciones entergadas por la API.
 * @param {*} metodo Metodo de busqueda seleccionado.
 * @returns < Container > con la estructura de las listas de cards de las votaciones segun su metodo.
 */
function Tabla({first_Votations,metodo}){
    const dispatch = useDispatch()
    const {handleValor} = useParams()
    const [ListaVot,setListaVot]=useState(first_Votations)
    const [status,setStatus]=useState(true)
    const [pag,setPag]=useState(2)
    const by_Matter = useSelector(store=>store.by_Matter.array)
    const by_Bulletin = useSelector(store=>store.by_Bulletin.array)
    const by_Name = useSelector(store=>store.by_Name.array)
    const by_Date = useSelector(store=>store.by_Date.array)
    const VotacionesSiguientes = useSelector(store => store.first_Votations.array)
    function isEmpty(obj) {
        return Object.keys(obj).length === 0
    }
    const fetchData = () =>{
        setTimeout(() => {
            setPag(pag+1)
            switch (metodo) {
                case "principal":
                    dispatch(get_First_Votes_Action(pag))//obtiene las votaciones de la siguiente pagina de la API
                    if((typeof(VotacionesSiguientes)!=="string")){
                        setListaVot([...ListaVot,...VotacionesSiguientes])//actualiza ListaVot y le agrega los valores de VotacionesSiguientes
                        let ListaTemp=[...ListaVot,...VotacionesSiguientes]
                        setListaVot([...new Set(ListaTemp)])
                    }
                    else setStatus(false)
                    break;
                case "Materia":
                    dispatch(get_By_Matter_Action(handleValor,pag))
                    if((typeof(by_Matter)!=="string")){
                        setListaVot([...ListaVot,...by_Matter])
                        let ListaTemp=[...ListaVot,...by_Matter]
                        setListaVot([...new Set(ListaTemp)])
                    }
                    else setStatus(false)
                    break;
                case "Boletín":
                    dispatch(get_By_Bulletin_Action(handleValor,pag))
                    if(typeof(by_Bulletin)!=="string"){
                        setListaVot([...ListaVot,...by_Bulletin])
                        let ListaTemp=[...ListaVot,...by_Bulletin]
                        setListaVot([...new Set(ListaTemp)])
                    }
                    else setStatus(false)
                    break;
                case "Nombre":
                    dispatch(get_By_Name_Action(handleValor,pag))
                    if(typeof(by_Name)!=="string"){
                        setListaVot([...ListaVot,...by_Name])
                        let ListaTemp=[...ListaVot,...by_Name]
                        setListaVot([...new Set(ListaTemp)])
                    }
                    else setStatus(false)
                    break;
                case "Fecha":
                    dispatch(get_By_Date_Action(handleValor,pag))
                    if(typeof(by_Date)!=="string"){
                        setListaVot([...ListaVot,...by_Date])
                        let ListaTemp=[...ListaVot,...by_Date]
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