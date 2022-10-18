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
 * Function in charge of looking for the following voting cards according to their method.
 * @param {*} first_Votes The first votes delivered by the API.
 * @param {*} method Selected search method.
 * @returns < Container > with the structure of the voting card lists according to their method.
 */
function Table({first_Votes,method}){
    const dispatch = useDispatch()
    const {handle_Value} = useParams()
    const [voting_List,set_voting_List]=useState(first_Votes)
    const [status,set_Status]=useState(true)
    const [pag,set_Pag]=useState(2)
    const porMateria = useSelector(store=>store.porMateria.array)
    const porBoletin = useSelector(store=>store.porBoletin.array)
    const porNombre = useSelector(store=>store.porNombre.array)
    const porFecha = useSelector(store=>store.porFecha.array)
    const VotacionesSiguientes = useSelector(store => store.first_Votes.array)
    function isEmpty(obj) {
        return Object.keys(obj).length === 0
    }
    const fetchData = () =>{
        setTimeout(() => {
            set_Pag(pag+1)
            switch (method) {
                case "principal":
                    dispatch(obtenerPrimerasVotacionesAccion(pag))//get the votes of the next page of the API
                    if((typeof(VotacionesSiguientes)!=="string")){
                        set_voting_List([...voting_List,...VotacionesSiguientes])//updates voting_List and adds the values ​​of NextVotes
                        let ListaTemp=[...voting_List,...VotacionesSiguientes]
                        set_voting_List([...new Set(ListaTemp)])
                    }
                    else set_Status(false)
                    break;
                case "Materia":
                    dispatch(obtenerPorMateriaAccion(handle_Value,pag))
                    if((typeof(porMateria)!=="string")){
                        set_voting_List([...voting_List,...porMateria])
                        let ListaTemp=[...voting_List,...porMateria]
                        set_voting_List([...new Set(ListaTemp)])
                    }
                    else set_Status(false)
                    break;
                case "Boletín":
                    dispatch(obtenerPorBoletinAccion(handle_Value,pag))
                    if(typeof(porBoletin)!=="string"){
                        set_voting_List([...voting_List,...porBoletin])
                        let ListaTemp=[...voting_List,...porBoletin]
                        set_voting_List([...new Set(ListaTemp)])
                    }
                    else set_Status(false)
                    break;
                case "Nombre":
                    dispatch(obtenerPorNombreAccion(handle_Value,pag))
                    if(typeof(porNombre)!=="string"){
                        set_voting_List([...voting_List,...porNombre])
                        let ListaTemp=[...voting_List,...porNombre]
                        set_voting_List([...new Set(ListaTemp)])
                    }
                    else set_Status(false)
                    break;
                case "Fecha":
                    dispatch(obtenerPorFechaAccion(handle_Value,pag))
                    if(typeof(porFecha)!=="string"){
                        set_voting_List([...voting_List,...porFecha])
                        let ListaTemp=[...voting_List,...porFecha]
                        set_voting_List([...new Set(ListaTemp)])
                    }
                    else set_Status(false)
                    break;
                default:
                    break;
                }
        },0);
    }
    return(
        <Container>
                {!isEmpty(voting_List)?
                <InfiniteScroll
                dataLength={voting_List.length}
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
                {voting_List.map((post,index) => (
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
export default Table;