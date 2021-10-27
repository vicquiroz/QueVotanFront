import React, {useEffect, useState} from 'react'
import {Container, CardBody, Card, CardHeader, CardText} from 'reactstrap'
import InfiniteScroll from 'react-infinite-scroll-component'
import statuscolor from '../resources/statuscolor.json'

function Tabla({primerasVotaciones}){
    
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
                    <div key={post.detalle_id}>
                    <div onClick={()=> window.location.href="/grafico/"+post.detalle_id} style={{ cursor:"pointer",textDecoration: 'none' }}>
                        <Card className="text-light" style={{backgroundColor:"rgba(50,50,50,0.95)"}}>
                            <CardHeader><b>{post.detalle[0].camaraOrigen} - Votacion {post.detalle_id} </b>Ingresada en {post.detalle[0].fechaIngreso.slice(0,10)} Realizada en {post.detalle[0].VotacionesAsoc[0].date.slice(0,10)}</CardHeader>
                            <CardBody>
                                <CardText>
                                    <b>Boletin N°: </b>{post.detalle[0].numeroBoletin}
                                    <br/>
                                    <b>Tipo: </b>{post.detalle[0].VotacionesAsoc[0].tipoProyecto}
                                    <br/>
                                    <b>Estado: </b>{PrimeraLetraMayuscula(post.detalle[0].VotacionesAsoc[0].tramiteConst.toLowerCase())} - {PrimeraLetraMayuscula(post.detalle[0].VotacionesAsoc[0].tramiteRegla.toLowerCase())}
                                    <br/>
                                    <b>Resultado: </b><strong style={{color:statuscolor[post.detalle[0].VotacionesAsoc[0].resultado]}}>{post.detalle[0].VotacionesAsoc[0].resultado}</strong>
                                    <br/>
                                    <b>Descripcion: </b>{post.detalle[0].nombre}
                                    <br/>
                                    <b>Quórum: </b>{post.detalle[0].VotacionesAsoc[0].quorum}
                                </CardText>
                            </CardBody>
                        </Card>
                    </div>
                    <br />
                    </div>
                ))}
                </InfiniteScroll>
        </Container>
    )
}
export default Tabla;