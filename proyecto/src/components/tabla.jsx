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
 * Function in charge of looking for the following voting cards according to their method.
 * @param {*} first_Votes The first votes delivered by the API.
 * @param {*} method Selected search method.
 * @returns < Container > with the structure of the voting card lists according to their method.
 */
function Table({first_Votations,method}){
    const dispatch = useDispatch()
    const {handle_Value} = useParams()
    const [voting_List,set_voting_List]=useState(first_Votations)
    const [status,set_Status]=useState(true)
    const [pag,set_Pag]=useState(2)
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
            set_Pag(pag+1)
            switch (method) {
                case "principal":
                    dispatch(get_First_Votes_Action(pag))//get the votes of the next page of the API
                    if((typeof(VotacionesSiguientes)!=="string")){
                        set_voting_List([...voting_List,...VotacionesSiguientes])//updates voting_List and adds the values ​​of NextVotes
                        let ListaTemp=[...voting_List,...VotacionesSiguientes]
                        set_voting_List([...new Set(ListaTemp)])
                    }
                    else set_Status(false)
                    break;
                case "Materia":
                    dispatch(get_By_Matter_Action(handle_Value,pag))
                    if((typeof(by_Matter)!=="string")){
                        set_voting_List([...voting_List,...by_Matter])
                        let ListaTemp=[...voting_List,...by_Matter]
                        set_voting_List([...new Set(ListaTemp)])
                    }
                    else set_Status(false)
                    break;
                case "Boletín":
                    dispatch(get_By_Bulletin_Action(handle_Value,pag))
                    if(typeof(by_Bulletin)!=="string"){
                        set_voting_List([...voting_List,...by_Bulletin])
                        let ListaTemp=[...voting_List,...by_Bulletin]
                        set_voting_List([...new Set(ListaTemp)])
                    }
                    else set_Status(false)
                    break;
                case "Nombre":
                    dispatch(get_By_Name_Action(handle_Value,pag))
                    if(typeof(by_Name)!=="string"){
                        set_voting_List([...voting_List,...by_Name])
                        let ListaTemp=[...voting_List,...by_Name]
                        set_voting_List([...new Set(ListaTemp)])
                    }
                    else set_Status(false)
                    break;
                case "Fecha":
                    dispatch(get_By_Date_Action(handle_Value,pag))
                    if(typeof(by_Date)!=="string"){
                        set_voting_List([...voting_List,...by_Date])
                        let ListaTemp=[...voting_List,...by_Date]
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