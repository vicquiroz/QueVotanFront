import React, {useEffect, useState} from 'react'
import {Container, CardBody, Card, CardHeader, CardText} from 'reactstrap'
import InfiniteScroll from 'react-infinite-scroll-component'
import statuscolor from '../resources/statuscolor.json'

function Tabla({primerasVotaciones}){
    console.log(primerasVotaciones)
    const [vot,setVot] = useState([])
    const [limit,setLimit]=useState()

    useEffect(()=>{
        primerasVotaciones=[primerasVotaciones]
    })

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
                    <div onClick={()=> window.location.href="/grafico/"+post.id} style={{ cursor:"pointer",textDecoration: 'none' }}>
                        <Card className="text-light" style={{backgroundColor:"rgba(50,50,50,0.95)"}}>
                            <CardHeader><b>Camara de diputados - Votacion {post.id} </b>Ingresada en {console.log(typeof(post.fechaIngresoBoletin))}{post.fechaIngresoBoletin} {''}
                            Realizada en {post.fecha}</CardHeader>
                            <CardBody>
                                <CardText>
                                    <b>Boletin N°: </b>{post.boletin}
                                    <br/>
                                    <b>Tipo: </b>{post.tipoProyecto}
                                    <br/>
                                    <b>Estado: </b>{post.tramiteConst} - {post.tramiteRegla}
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