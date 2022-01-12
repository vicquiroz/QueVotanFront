import React, {useEffect, useState} from 'react'
import {Container, CardBody, Card, CardHeader, CardText} from 'reactstrap'
import InfiniteScroll from 'react-infinite-scroll-component'
import statuscolor from '../resources/statuscolor.json'

function Tabla({primerasVotaciones}){
    const [vot,setVot] = useState([])
    const [limit,setLimit]=useState()
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
    console.log(primerasVotaciones)
    return(
        <Container>
                <InfiniteScroll
                dataLength={vot.length}
                next={fetchData}
                hasMore={true}
                >
                {vot.map((post) => (
                    <div key={post.id}>
                    <div onClick={()=> window.location.href="/grafico/"+post.id} style={{ cursor:"pointer",textDecoration: 'none' }}>
                        <Card className="text-light" style={{backgroundColor:"rgba(50,50,50,0.95)"}}>
                            <CardHeader><b>Camara de diputados - Votacion {post.id} </b>- Ingresada en {JSON.stringify(post.fechaIngresoBoletin).slice(10,20)} - Realizada en {JSON.stringify(post.fecha).slice(10,20)}</CardHeader>
                            <CardBody>
                                <CardText>
                                    <b>Boletin N°: </b>{post.boletin}
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
                    <br />
                    </div>
                ))}
                </InfiniteScroll>
        </Container>
    )
}
export default Tabla;