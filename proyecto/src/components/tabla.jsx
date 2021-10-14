import React, {useEffect, useState} from 'react'
import {Container, CardBody, Card, CardHeader, CardText} from 'reactstrap'
import { Link } from "react-router-dom";
import InfiniteScroll from 'react-infinite-scroll-component'


function Tabla({busqueda,primerasVotaciones}){

    const [vot,setVot] = useState([])
    const [limit,setLimit]=useState()

    function PrimeraLetraMayuscula(string){
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    useEffect(()=>{
        setVot(primerasVotaciones.slice(0,10))
        setLimit(20)
    },[primerasVotaciones])

    const fetchData = () =>{
        setTimeout(() => {
            setVot(primerasVotaciones.slice(0,limit))
            if(limit<primerasVotaciones.length){
                setLimit(limit+10)
            }
        },500);
    }

    return(
        <Container>
                <InfiniteScroll
                dataLength={vot.length}
                next={fetchData}
                hasMore={true}
                >
                {vot.map((post) => (
                    <div key={post.id}>
                    <Link onClick={()=> window.location.href="/grafico/"+post.detalle_id} style={{ textDecoration: 'none' }}>
                        <Card className="text-light" style={{backgroundColor:"rgba(0,0,0,0.8)"}} >
                            <CardHeader><b>{post.detalle[0].camaraOrigen} - Votacion {post.detalle_id} </b>Ingresada en {post.detalle[0].fechaIngreso.slice(0,10)} Realizada en {post.detalle[0].VotacionesAsoc[0].date.slice(0,10)}</CardHeader>
                            <CardBody>
                                <CardText>
                                    <b>Boletin N°: </b>{post.detalle[0].numeroBoletin}
                                    <br/>
                                    <b>Tipo: </b>{post.detalle[0].VotacionesAsoc[0].tipoProyecto}
                                    <br/>
                                    <b>Estado: </b>{PrimeraLetraMayuscula(post.detalle[0].VotacionesAsoc[0].tramiteConst.toLowerCase())} - {PrimeraLetraMayuscula(post.detalle[0].VotacionesAsoc[0].tramiteRegla.toLowerCase())}
                                    {/*<br/>
                                    <b>Resultado: </b>{post.detalle[0].VotacionesAsoc[0].resultado}*/}
                                    <br/>
                                    <b>Descripcion: </b>{post.detalle[0].nombre}
                                </CardText>
                            </CardBody>
                        </Card>
                    </Link>
                    <br />
                    </div>
                ))}
                </InfiniteScroll>
        </Container>
    )
}
export default Tabla;